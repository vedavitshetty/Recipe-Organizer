from django.test import Client
from django.urls import reverse

from common.utils.tests import TestCaseUtils


class RecipeListViewTest(TestCaseUtils):
    def test_recipe_list_view(self):
        client = Client()
        response = client.get(reverse('recipe-list'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'recipe_list.html')
        self.assertContains(response, 'No recipes available')

    def test_recipe_list_with_recipes(self):
        client = Client()
        response = client.get(reverse('recipe-list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Test Recipe')
