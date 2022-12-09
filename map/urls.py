from django.urls import path
from . import views

## urls to map and geojson
urlpatterns = [
    path("", views.index, name="index"),   
    path("geofile", views.geofile, name="geofile"),
]