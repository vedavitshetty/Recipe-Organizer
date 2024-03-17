from typing import ClassVar

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Recipe, Restaurant
from .serializers import RecipeSerializer, RestaurantSerializer


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
