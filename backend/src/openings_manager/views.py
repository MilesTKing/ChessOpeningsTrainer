from http.client import HTTPResponse

from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse, Http404
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt

from .models import Openings
from django.views.decorators.http import require_http_methods, require_POST, require_GET
import json
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def csrf(request):
    return JsonResponse({"message": "CSRF cookie set"})

@require_POST
def register(request):
    email = request.POST.get('email')
    name = request.POST.get('name')
    password = request.POST.get('password')
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
    return HttpResponseRedirect(request.POST.get('next','/'))

@require_POST
def login_view(request):
    #Update user model to use email and password instead of username and password.
    email = request.POST.get('email')
    password = request.POST.get('password')
    name = request.POST.get('name')
    if not name:
        return HttpResponse('Missing password', status=400)
    if not email:
        return HttpResponse('Missing email', status=400)
    if not password:
        return HttpResponse('Missing password', status=400)
    user = authenticate(request, username=name, password=password)
    login(request, user)
    return HttpResponseRedirect(request.POST.get('next','/'))

@require_POST
def logout(request):
    logout(request)
    return HttpResponse(status=204)
@require_http_methods(["GET", "POST"])
def openings(request, opening_name = None):
    if not request.user.is_authenticated:
        raise HttpResponse('Must be logged in', status=401)

    if request.method == 'POST':
        body= json.loads(request.body)
        name = body.get('name').lower()
        positions = body.get('positions')
        if Openings.objects.filter(name=name).exists():
            return HttpResponse('Opening name already taken', status=409)
        opening = Openings(name=name, positions=positions, user = request.user)
        opening.save()
        return HttpResponseRedirect(request.POST.get('next','./'))

    if request.method == 'GET':
        if opening_name:
            opening = get_object_or_404(Openings, name=opening_name)
            return JsonResponse({'name': opening.name, 'positions': opening.positions})

        all_openings = Openings.objects.all().filter(user=request.user)
        openings_message = {}
        for opening in all_openings:
            openings_message[opening.name] = opening.positions
        return JsonResponse(openings_message, safe = True)