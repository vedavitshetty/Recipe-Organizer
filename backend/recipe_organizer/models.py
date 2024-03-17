from django.db import models

from common.models import IndexedTimeStampedModel
from users.models import User


class Recipe(IndexedTimeStampedModel):
    title = models.CharField(max_length=100)
    description = models.TextField()
    instructions = models.TextField()
    ingredients = models.TextField()
    source_url = models.URLField()

    def __str__(self):
        return self.title


class Restaurant(models.Model):
    owner = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="restaurant"
    )
    name = models.CharField(max_length=100, unique=True)
    recipes = models.ManyToManyField(Recipe, related_name="restaurants", blank=True)

    def __str__(self):
        return self.name


class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(
        Restaurant, on_delete=models.CASCADE, related_name="employees"
    )

    def __str__(self):
        return f"{self.user.email} - {self.restaurant.name}"
