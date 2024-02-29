from typing import ClassVar

from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Recipe
from .serializers import RecipeSerializer


class RecipeViewSet(viewsets.ViewSet):
    permission_classes: ClassVar = [IsAuthenticated]

    def list_recipes(self, request):
        queryset = Recipe.objects.all()
        serializer = RecipeSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Recipe.objects.all()
        recipe = get_object_or_404(queryset, pk=pk)
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)

    def create(self, request):
        serializer = RecipeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
