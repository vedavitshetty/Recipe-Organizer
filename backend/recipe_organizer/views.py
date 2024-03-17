from typing import ClassVar

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

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


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes: ClassVar = [IsAuthenticated]

    @action(detail=True, methods=["post"])
    def assign_to_restaurant(self, request, pk=None):
        recipe = self.get_object()
        user = request.user
        if user.restaurant:
            user.restaurant.recipes.add(recipe)
            return Response(
                {"message": "Recipe assigned to restaurant successfully"},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"error": "User does not belong to a restaurant"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    @action(detail=True, methods=["post"])
    def remove_from_restaurant(self, request, pk=None):
        recipe = self.get_object()
        user = request.user
        if user.restaurant:
            user.restaurant.recipes.remove(recipe)
            return Response(
                {"message": "Recipe removed from restaurant successfully"},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"error": "User does not belong to a restaurant"},
            status=status.HTTP_400_BAD_REQUEST,
        )


class AllRecipesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


class AllRestaurantsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
