from .models import User, Jsons
from django import forms

class JsonForm(forms.ModelForm):
    
    class Meta:
        model = Jsons
        fields = ['the_json']