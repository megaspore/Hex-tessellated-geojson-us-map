# Hex tesilate geojson from a series of Geographic coordinate in json format
The django frame work:
Views.py = Backend pyhthon script for the webpage
  1. Index : script for rendering the map url
  2. Geofile : script for converting json to jeojson and hosing it in weathermap/geofile url path

urls.py= your two urls

urlpatterns = [
    path("weathermap", views.index, name="index"),   
    path("weathermap/geofile", views.geofile, name="geofile"),
]

convertpoint.py = converts json file to a geojson file with a single point
convertsquare.py= converts json file to geojason as a square
converhex.py= is the script in progress to convert to a tessilated hex map right now im generating it manually via pyEAC

Currently views.py converts to squares. if you delete geodata/test.geojson and loccally load webpage a new test file will generate and host.
If you change the output in views def geofile to the hex path bellow you can see the hex placement of the data when the map loads


geodata.testhex.geoson has the correct hex tessilation in the geojson file. if you want to addapt your backend to contain that data for each location it would probably be ideal rather that generating a new tessilation everytime a user looks at the page. this is the format we should just have the data in. I was trying to figure out how to just parse the cordinences off and attach them to your current backend json as a reference but I his a brick wall, maybe just do in manually.

bengie/weather/map/templates/map/weathermap.html
has the Java script for the current map. currently its buggy, the popups arent working with the new polygon generations, it works with the point placement of the data though, which is not currently set up in the environmt via views.py

bengie/weather/map/templates/map/geotest.html
is blank, this is where the json file populates

bengie/weather/map/templates/map/layout.html
Is a boiler plait layout for the page

Models and forms.py can help us manipulate the data eventually for the user. Ideally the backend data you have would just be a model on here

Django references if you want to set up:

https://cs50.harvard.edu/web/2020/notes/3/
https://youtu.be/w8q0C-C1js4?list=TLPQMjUxMDIwMjK8z4urEoom4w
