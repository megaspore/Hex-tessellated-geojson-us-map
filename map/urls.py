from django.urls import path
from . import views

## urls to map and geojson
urlpatterns = [
    path("weathermap", views.index, name="index"),   
    path("weathermap/geofile", views.geofile, name="geofile"),
]