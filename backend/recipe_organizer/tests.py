from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from .models import Recipe, Restaurant
from .serializers import RecipeSerializer, RestaurantSerializer


User = get_user_model()


class AllRestaurantsViewSetTest(APITestCase):
    def setUp(self):
        # Create a user who will be the owner of the restaurants
        self.owner1 = User.objects.create_user(
            email="restaurantowner@test.com", password="password"
        )
        self.owner2 = User.objects.create_user(
            email="restaurantowner2@test.com", password="password"
        )

        # Create some restaurants for testing with the owner
        self.restaurant1 = Restaurant.objects.create(
            name="Restaurant 1", owner=self.owner1
        )
        self.restaurant2 = Restaurant.objects.create(
            name="Restaurant 2", owner=self.owner2
        )

    def test_list_restaurants(self):
        url = reverse("restaurant-list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Serialize the expected data
        expected_data = RestaurantSerializer(
            [self.restaurant1, self.restaurant2], many=True
        ).data

        # Sort both response data and expected data by restaurant name
        response_data = sorted(response.data["results"], key=lambda x: x["name"])
        expected_data = sorted(expected_data, key=lambda x: x["name"])

        # Compare response data with expected data
        self.assertEqual(response_data, expected_data)


class RecipeViewSetTest(APITestCase):
    def setUp(self):
        # Create a user who will be the owner of the recipes
        self.user = User.objects.create_user(
            email="recipeowner@test.com", password="password"
        )

        # Create some recipes for testing with the owner
        self.recipe1 = Recipe.objects.create(
            title="Recipe 1",
            description="Description 1",
            instructions="Instructions 1",
            ingredients="Ingredients 1",
            source_url="https://example.com",
        )
        self.recipe2 = Recipe.objects.create(
            title="Recipe 2",
            description="Description 2",
            instructions="Instructions 2",
            ingredients="Ingredients 2",
            source_url="https://example.com",
        )

    def test_create_recipe(self):
        url = reverse("recipe-list-create")
        data = {
            "title": "New Recipe",
            "description": "New Description",
            "instructions": "New Instructions",
            "ingredients": "New Ingredients",
            "source_url": "https://example.com",
        }
        self.client.force_authenticate(user=self.user)
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_recipes(self):
        url = reverse("recipe-list-create")
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Inspect the structure of the response data
        print(response.data)

        # Compare the number of recipes returned with the number created in the setup
        self.assertEqual(len(response.data["results"]), Recipe.objects.count())

    def test_retrieve_recipe(self):
        url = reverse("recipe-detail", kwargs={"pk": self.recipe1.pk})
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Serialize the expected data for the single recipe
        expected_data = RecipeSerializer(self.recipe1).data

        # Compare response data with expected data
        self.assertEqual(response.data, expected_data)
