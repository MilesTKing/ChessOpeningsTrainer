from django.urls import path

from . import views

app_name = "openings_manager"
urlpatterns = [
    path("csrf/", views.csrf),
    path("auth/login", views.login_view, name="login"),
    path("auth/logout", views.logout, name="logout"),
    path("auth/register", views.register, name="register"),
    path("openings/", views.openings, name="openings"),
    path("openings/<opening_name>/", views.openings, name="opening-detail"),
]
