#!/usr/bin/env python3
#-*- coding: utf-8 -*-

from datetime import datetime
from django.shortcuts import render
from django.http import HttpResponse
import json 
from django.http import JsonResponse
from .models import User, Jsons
import os
import math
from shapely.geometry import shape, Point, Polygon
from pyproj import Proj, transform
import json
import requests

password = 'VrRoZ7e2TJ0LoEmTiqpYclTRISNWwp'

url = 'http://44.200.130.241:5000/geojson/20221218/NWS/temperature/' + str(password)
headers = {"Authorization": f"Bearer {password}"}

## Redirects you to the url with the map
def index(request):
    return render(request, "map/weathermap.html" )

def geofile(request):
    #hexfile = "/home/isagonza/bengie/map/geodata/testhex.geojson"
    #j = json.load(open(hexfile, 'r', encoding = 'utf-8'))
    r = requests.get(url, headers=headers)
    j = json.loads(r.text)
    
    return JsonResponse(j,safe=False)