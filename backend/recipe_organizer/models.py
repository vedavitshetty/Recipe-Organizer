from django.db import models

from common.models import IndexedTimeStampedModel


class Recipe(IndexedTimeStampedModel):
    title = models.CharField(max_length=100)
    description = models.TextField()
    instructions = models.TextField()
    ingredients = models.TextField()
    source_url = models.URLField()

    def __str__(self):
        return self.title


class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    recipes = models.ManyToManyField(Recipe, related_name="restaurants")

    def __str__(self):
        return self.name
