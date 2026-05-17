from django.urls import path

from . import views

app_name = "openings_manager"
urlpatterns = [
    path("auth/", views.login, name="login"),
    path("auth/", views.logout, name="logout"),
    path("auth/", views.register, name="register"),
    path("openings/", views.openings, name="openings"),
    path("openings/<opening_name>/", views.openings, name="opening-detail"),
]
