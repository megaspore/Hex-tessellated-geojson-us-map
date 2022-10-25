from django.db import models
# "pip install django-jsonfield" :for jsonfield


from django.contrib.auth.models import AbstractUser
# Create your models here.

# creating users & superuser list for backend 
class User(AbstractUser):
    pass

# storing json file and converted geojson
class Jsons(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    the_json = models.JSONField()
    the_geojson = models.JSONField(null=True)