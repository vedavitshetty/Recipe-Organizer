from django.contrib import admin
from django.urls import include, path, re_path

import django_js_reverse.views
from common.views import IndexView
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()

urlpatterns = [
    path("", include("common.urls"), name="common"),
    path("admin/", admin.site.urls, name="admin"),
    path("admin/defender/", include("defender.urls")),
    path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),
    path("api/", include(router.urls), name="api"),
    path(
        "api/recipes/",
        views.RecipeViewSet.as_view({"get": "list", "post": "create"}),
        name="recipe-list-create",
    ),
    path(
        "api/recipes/<int:pk>/",
        views.RecipeViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
        name="recipe-detail",
    ),
    path(
        "api/restaurants/",
        views.AllRestaurantsViewSet.as_view({"get": "list"}),
        name="restaurant-list",
    ),
    path(
        "api/register/",
        views.UserRegistrationViewSet.as_view({"post": "create"}),
        name="register",
    ),
    path("api/login/", views.UserLoginAPIView.as_view(), name="login"),
    path("api/logout/", views.LogoutView.as_view(), name="logout"),
    path(
        "api/recipes/show_restaurant_recipes/",
        views.RecipeViewSet.as_view({"get": "show_restaurant_recipes"}),
        name="show-restaurant-recipes",
    ),
    path(
        "api/recipes/show_non_restaurant_recipes/",
        views.RecipeViewSet.as_view({"get": "show_non_restaurant_recipes"}),
        name="show-non-restaurant-recipes",
    ),
    path(
        "api/recipes/add_to_restaurant/<int:pk>/",
        views.RecipeViewSet.as_view({"post": "add_to_restaurant"}),
        name="add-to-restaurant",
    ),
    path(
        "api/recipes/remove_from_restaurant/<int:pk>/",
        views.RecipeViewSet.as_view({"post": "remove_from_restaurant"}),
        name="remove-from-restaurant",
    ),
    path(
        "api/recipes/<int:pk>/",
        views.RecipeViewSet.as_view({"get": "retrieve"}),
        name="recipe-detail",
    ),
    # Catch-all route for React app
    re_path(r"^(?P<path>.*)/$", IndexView.as_view(), name="index"),
]
