from http.client import HTTPResponse

from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse, Http404
from django.contrib.auth import authenticate, login, logout
from .models import Openings
from django.views.decorators.http import require_http_methods, require_POST, require_GET
import json

@require_POST
def register(request):
    email = request.POST['email']
    name = request.POST['name']
    password = request.POST['password']
    if not email:
        return HttpResponse('Missing email', status=400)
    if not name:
        return HttpResponse('Missing name', status=400)
    if not password:
        return HttpResponse('Missing password', status=400)

    if User.objects.filter(email=email).exists():
        return HttpResponse('Email already registered', status=409)

    user = User.objects.create_user(name, email, password)
    user.save()
    return HttpResponseRedirect(request.POST['next'])

@require_POST
def login(request):
    if request.method != 'POST':
        return HttpResponse(status=405)

    email = request.POST['email']
    password = request.POST['password']
    if not email or not password:
        return #insufficient data
    user = authenticate(request, email=email, password=password)
    login(request, user)
    return HttpResponseRedirect(request.POST['next'])

@require_POST
def logout(request):
    logout(request)
    return HttpResponse(status=204)

@require_http_methods(["GET", "POST"])
def openings(request, opening_name = None):
    if not request.user.is_authenticated:
        raise HttpResponse('Must be logged in', status=401)

    if request.method == 'POST':
        name = request.POST['name'].lower()
        user = request.user
        positions = request.POST['positions']
        opening = Openings(name=name, positions=positions, user=user)
        opening.save()
        return HttpResponseRedirect(request.POST['next'])

    if request.method == 'GET':
        if opening_name:
            opening = get_object_or_404(Openings, name=opening_name)
            return JsonResponse({'name': opening.name, 'positions': opening.positions})

        all_openings = Openings.objects.all()
        openings_message = {}
        for opening in all_openings:
            openings_message[opening.name] = opening.positions
        return JsonResponse(openings_message, safe = True)