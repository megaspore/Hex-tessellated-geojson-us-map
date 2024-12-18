
mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuZ2llaHVudCIsImEiOiJjbDloNWh2ZncwODVhM3VyeXU1bHdwOTVkIn0.ZmecDzfsknlIZEiUd0ZOiw';

const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    // blank style: {version: 8,sources: {},layers: []},
    style: {version: 8,sources: {},layers: []},
    //style: 'mapbox://styles/bengiehunt/cl9h6g3me000s14qy62c9nwdz',
    center: [-95.04, 38.907],
    zoom: 3
});
// disable map zoom when using scroll
map.scrollZoom.disable();
// disable dragpan
map.dragPan.disable();
map.dragRotate.disable();
map.keyboard.disable();
map.touchZoomRotate.disable();
map.doubleClickZoom.disable();
map.boxZoom.disable();



document.addEventListener('DOMContentLoaded', function() {
    
    var myHeaders = new Headers();
    //api key here
   

    var requestOptions = {
    method: 'GET',
    mode: "no-cors",    
    redirect: 'follow',
    headers: {
        'Authorization': 'Bearer <VrRoZ7e2TJ0LoEmTiqpYclTRISNWwp>',
        'Content-Type': 'application/x-www-form-urlencoded'
     },
    };

    $.ajax({
        url: 'http://44.200.130.241:5000/geojson/20221219/VC/temperature/VrRoZ7e2TJ0LoEmTiqpYclTRISNWwp',
        type: 'GET',
        mode: "no-cors",
        contentType: 'application/json',
        headers: {
           'Authorization': 'Bearer <VrRoZ7e2TJ0LoEmTiqpYclTRISNWwp>'
        },
        success: function (result) {
            console.log(result)
        },
        error: function (error) {
            console.log('error')
     
        }
     });
    
   //' .then(response => response.json())
    //.then(data => {
        // Log data to the console
       

const mygeojson = data
map.on('load', () => {
    document.querySelector('#hexlegend').style.display = 'none';
    
    map.addSource('places', {
        'type': 'geojson',
        'data': mygeojson
       
    
    });

    map.addSource('hexes', {
        'type': 'geojson',
        'data': mygeojson
    });    
    
    //7 day rmse highs layer
     map.addLayer({
        'id': '7day rmse highs',
        'type': 'fill',
        'source': 'hexes',
        'layout': {
            // Make the layer visible by default.
            'visibility': 'visible'
            },
        'paint': {
            'fill-color': 
                {
                property: '7_days_rmse_temp_max',                
                stops: [[0, 'grey'], [1.0, '#1F214D'], [2, '#50366F'], [4, '#BF3475'], [5, '#EE6C45'], [6, '#FFCE61'], [7, '#FFE58A'], [9, '#f9e9da'], [10, 'white']]               
                },
                'fill-opacity': 0.8,
        }
    }); 

    // 7 dayrmse legend generation
    const seven_day_rmse_colors = [
        'grey',
        '#1F214D',
        '#50366F',
        '#FD8D3C',
        '#BF3475',
        '#E31A1C',
        '#FFCE61',
        '#FFE58A',
        '#f9e9da',
        'white'

        ];
    const seven_day_rmse_layers = [
        'none',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7-8',
        '9',
        '10'
      ];
        const rmseleg= document.getElementById('legend');
        seven_day_rmse_layers.forEach((layer, i) => {
            var color = seven_day_rmse_colors[i];
            var item = document.createElement('div');
            var key = document.createElement('span');
            key.className = 'legend-key';
            key.style.backgroundColor = color;
          
            var value = document.createElement('span');
            value.innerHTML = `${layer}`;
            item.appendChild(key);
            item.appendChild(value);
            rmseleg.appendChild(item);
          });
    

    // Add a layer showing the  active hexes 
    map.addLayer({
        'id': 'Hexes',
        'type': 'fill',
        'source': 'hexes',
        'layout': {
            // Make the layer visible by default.
            'visibility': 'none'
            },
        'paint': {
            'fill-color': {
                property: 'active',
                
                stops: [[0, 'grey'], [1, '#FF1493']]
                },
            'fill-opacity': 0.5
        }
    });

    //active hex legend
    const hex_colors = [
        '#FF1493',
        'grey'

        ];
    const hex_layers = [
        'Active',
        'Not active',
        
      ];
        const hexleg= document.getElementById('hexlegend');
        hex_layers.forEach((layer, i) => {
            var color =  hex_colors[i];
            var item = document.createElement('div');
            var key = document.createElement('span');
            key.className = 'legend-key';
            key.style.backgroundColor = color;
          
            var value = document.createElement('span');
            value.innerHTML = `${layer}`;
            item.appendChild(key);
            item.appendChild(value);
             hexleg.appendChild(item);
          });


    map.addLayer({
        'id': 'dot',
        'type': 'circle',
        'source': 'places',
        'layout': {},
        'paint': {
        'fill-color': 'white',
        'fill-opacity': [
        'case',
        ['boolean', ['feature-geometry', 'click'], false],
        1,
        0.5
        ]
        }
    });
   


    map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'hexes',
        'layout': {},
        'paint': {
        'line-color': '#000',
        'line-width': 3
        }
    });

    //places layer where data is accessed through by clicking
    map.addLayer({
        'id': 'places',
        'filter': ["==", ["geometry-type"], "Point"],
        'type': 'circle',
        'source': 'places',
        'paint': {
        'circle-color': "transparent",
        'circle-radius': 6, 
        }
    });     
});
});
//});



  

 // After the last frame rendered before the map enters an "idle" state.
 map.on('idle', () => {
    // If these two layers were not added to the map, abort
    if (!map.getLayer('Hexes') || !map.getLayer('7day rmse highs')) {
        return;
    }
     
    // Enumerate ids of the layers.
    const toggleableLayerIds = ['Hexes', '7day rmse highs'];
     
    // Set up the corresponding toggle button for each layer.
    for (const id of toggleableLayerIds) {
    // Skip layers that already have a button set up.
        if (document.getElementById(id)) {
            continue;
        }
     
        // Create a link.
        const link = document.createElement('button');
        link.id = id;
        link.href = '#';
        link.textContent = id;
        link.className = 'btn menu_btn btn-secondary ';
     
        // Show and hide all other layers when the toggle is clicked.
        link.onclick = function(e) {
            var clickedLayer = this.textContent;
            e.preventDefault();
            e.stopPropagation();
            
            for (var j = 0; j < toggleableLayerIds.length; j++) {
              if (clickedLayer === toggleableLayerIds[j]) {
                menu.children[j].className = 'menu_btn btn btn-info';
                map.setLayoutProperty(toggleableLayerIds[j], 'visibility', 'visible');
                document.querySelector('#legend').style.display = 'block';
                document.querySelector('#hexlegend').style.display = 'none';
              }
              else {
                menu.children[j].className = 'menu_btn btn btn-secondary';
                map.setLayoutProperty(toggleableLayerIds[j], 'visibility', 'none');  
                document.querySelector('#legend').style.display = 'none';
                document.querySelector('#hexlegend').style.display = 'block';
                }
            }
          };
     
        const menu = document.getElementById('menu');
        menu.appendChild(link);
        

    }
});   


    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
        closeButton: false,
        className: 'popup',
        closeOnClick: false
    });

    const table = document.getElementById('table');
    const station = document.getElementById('station');
    const forcast_accuracy = document.getElementById('forcast_accuracy');

    map.on('mouseenter', 'places', (e) => {
        map.getCanvas().style.cursor = 'pointer';

        const coordinates = e.features[0].geometry.coordinates.slice();
        const location = e.features[0].properties.location.split(",");
        popup.setLngLat(coordinates).setHTML(` <img class="pinimg" src=https://cdn.icon-icons.com/icons2/2460/PNG/512/location_pin_place_map_address_placeholder_icon_149099.png alt="">
                                                ${(location[2])[1]}${(location[3])[1]}${(location[4])[1]}`).addTo(map);

        map.on('click', 'places', (e) => {
            // Copy coordinates array.
                        
            const accuracy = Math.floor((((e.features[0].properties.temp_max_observation 
                + e.features[0].properties.temp_min_observation) 
                - (Math.abs(e.features[0].properties.bias_temp_max) 
                + Math.abs(e.features[0].properties.bias_temp_min)))/(e.features[0].properties.temp_max_observation 
                    + e.features[0].properties.temp_min_observation)) * 100);
            const maxtempfcast = parseFloat(e.features[0].properties.temp_max_forecast);
            const mintempfcast = (e.features[0].properties.temp_min_forecast);
            const maxtempobsrv = parseFloat(e.features[0].properties.temp_max_observation);
            const mintempobsrv = parseFloat(e.features[0].properties.temp_min_observation);
            const dayminacc = Math.floor(mintempfcast - mintempobsrv)
            const daymaxacc = Math.floor(maxtempfcast - maxtempobsrv)


            // Populate the popup and set its coordinates
            // based on the feature found.
          
            
            
            station.setHTML(`${location[2]}, ${location[3]}`);                                                                      
            forcast_accuracy.setHTML(`${accuracy}%`);

            table.setHTML(`<table class="table table-borderless">
            <thead>
              <tr>
                <th  scope="col"></th>
                <th class="light_purple" scope="col">Forcast</th>
                <th scope="col">Weather</th>
                <th class="light_blue" scope="col">Accuracy</th>
              </tr>
              <tbody>
              <tr>
                <th scope="row">High Temp.</th>
                <td class="light_purple">${maxtempfcast.toFixed(2)}&deg</td>
                <td>${maxtempobsrv.toFixed(2)}&deg</td>
                <td class="light_blue">${daymaxacc.toFixed(2)}&deg</td>
              </tr>
              <tr>
                <th scope="row">Low Temp.</th>
                <td class="light_purple">${mintempfcast.toFixed(2)}&deg</td>
                <td>${mintempobsrv.toFixed(2)}&deg</td>
                <td class="light_blue">${dayminacc.toFixed(2)}&deg</td>
              </tr>
              
            </tbody>
          </table>
            </thead>
          `)

        })
    });

    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
        
    });

    