from django.contrib import admin

from .models import Employee, Recipe, Restaurant


class RecipeAdmin(admin.ModelAdmin):
    list_display = ("title", "ingredients", "source_url")


class RestaurantAdmin(admin.ModelAdmin):
    list_display = ("name", "owner")


# Register your models here.
admin.site.register(Recipe, RecipeAdmin)
admin.site.register(Restaurant, RestaurantAdmin)
admin.site.register(Employee)
