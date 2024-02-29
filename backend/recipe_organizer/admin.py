from django.contrib import admin

from .models import Recipe, Restaurant


class RecipeAdmin(admin.ModelAdmin):
    list_display = ("title", "source_url")


class RestaurantAdmin(admin.ModelAdmin):
    list_display = ("name", "address")


# Register your models here.
admin.site.register(Recipe, RecipeAdmin)
admin.site.register(Restaurant, RestaurantAdmin)
