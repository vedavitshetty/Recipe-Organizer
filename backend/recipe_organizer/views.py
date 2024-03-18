from typing import ClassVar

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Employee, Recipe, Restaurant
from .serializers import RecipeSerializer, RestaurantSerializer, UserSerializer


class UserRegistrationViewSet(viewsets.ViewSet):
    def create(self, request, *args, **kwargs):
        # Extract user data from the request
        email = request.data.get("email")
        password = request.data.get("password")
        restaurant_data = request.data.get("restaurant", {})

        # Validate user data
        user_serializer = UserSerializer(data={"email": email, "password": password})
        if not user_serializer.is_valid():
            return Response(
                {"error": user_serializer.errors}, status=status.HTTP_400_BAD_REQUEST
            )

        # Create the user
        user_instance = user_serializer.save()

        # Check if a restaurant is selected or a new restaurant is added
        if "id" in restaurant_data:
            # Associate user with existing restaurant
            existing_restaurant_id = restaurant_data["id"]
            restaurant_instance = Restaurant.objects.get(pk=existing_restaurant_id)
            Employee.objects.create(user=user_instance, restaurant=restaurant_instance)
        elif "name" in restaurant_data:
            # Serialize and validate restaurant data
            restaurant_data["owner"] = user_instance.id
            restaurant_serializer = RestaurantSerializer(data=restaurant_data)
            if not restaurant_serializer.is_valid():
                user_instance.delete()  # Rollback user creation if restaurant creation fails
                return Response(
                    {"error": restaurant_serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Create the restaurant
            restaurant_instance = restaurant_serializer.save(owner=user_instance)
        else:
            # Restaurant data is invalid or missing
            user_instance.delete()
            return Response(
                {"error": "Invalid or missing restaurant data"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Return response
        return Response(
            {"user_id": user_instance.id, "restaurant_id": restaurant_instance.id},
            status=status.HTTP_201_CREATED,
        )


class UserLoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )


class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return JsonResponse({"message": "Logged out successfully"})


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes: ClassVar = [IsAuthenticated]

    @action(detail=False, methods=["get"])
    def show_restaurant_recipes(self, request):
        user = request.user
        restaurant = user.affiliated_restaurant()
        if not restaurant:
            return Response(
                {"error": "User does not belong to a restaurant"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        queryset = restaurant.recipes.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def show_non_restaurant_recipes(self, request):
        user = request.user
        restaurant = user.affiliated_restaurant()
        if not restaurant:
            return Response(
                {"error": "User does not belong to a restaurant"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        queryset = Recipe.objects.exclude(restaurants=restaurant)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def add_to_restaurant(self, request, pk=None):
        recipe = self.get_object()
        user = request.user
        restaurant = user.affiliated_restaurant()
        if not restaurant:
            return Response(
                {"error": "User does not belong to a restaurant"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        restaurant.recipes.add(recipe)
        return Response(
            {"message": "Recipe added to restaurant successfully"},
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"])
    def remove_from_restaurant(self, request, pk=None):
        recipe = self.get_object()
        user = request.user
        restaurant = user.affiliated_restaurant()
        if not restaurant:
            return Response(
                {"error": "User does not belong to a restaurant"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        restaurant.recipes.remove(recipe)
        return Response(
            {"message": "Recipe removed from restaurant successfully"},
            status=status.HTTP_200_OK,
        )


class AllRecipesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


class AllRestaurantsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
