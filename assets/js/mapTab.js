mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2lvdmVyYWhlcm5hbmRlemJpZGF0YSIsImEiOiJjbDMwZHc4cmswMDdqM2NydmIzYWF0cGl4In0.hsYQFPebleAB4j6mRckMzQ';
const map = new mapboxgl.Map({
        
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-70.680628,-33.469970],
    // projection: 'globe',
    zoom: 10,
    
});

const markers = [];

function apiCallMap() {

    let data = [
      {id:1,title:'Casa 1',LngLat: "{Lng: -70.619891, Lat: -33.379692 }"},
      {id:2,title:'Casa 2',LngLat: "{Lng: -70.533386, Lat: -33.352329 }"},
      {id:3,title:'Casa 3',LngLat: "{Lng: -70.58542468130258, Lat: -33.41607677906727 }"},
      {id:4,title:'Casa 4',LngLat: "{Lng: -70.630553, Lat: -33.363147 }"},
      {id:5,title:'Casa 5',LngLat: "{Lng: -70.732735, Lat: -33.355206 }"},
    ];
    
    const promiseMap = new Promise(
        (resolve)=>{
        data.map(data => {    
            
                if(data.LngLat === null )return; 

                const LngLat= data.LngLat.replace('{','').replace('}','').replace(',', '').replace('Lat', "").split(':');
            

                const propiedad = [parseFloat(LngLat[1]) , parseFloat(LngLat[2])];

                // create the popup
                const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <span>${data.title}</span>
                <br>
                <br>
                <a href="/detalle_propiedad.html" name="VerDetalle"  class="more d-flex align-items-center float-start" target="_blank">
                <span class="label" >Ver Detalle</span>
                <span class="arrow"><span class="icon-keyboard_arrow_right"></span></span>
                </a>`)

                // create DOM element for the marker
                const el = document.createElement('div');
                el.id = 'marker';
                // el.style.backgroundImage = `${data.img != null && data.img != '' && data.img != undefined ? data.img : "images/Sin.png"}`;
                // el.style.width = `${50}px`;
                // el.style.height = `${50}px`;
                // el.style.backgroundSize = "100%";
            
                const marker = new mapboxgl.Marker({
                    color: '#000',
                    scale: .8
                })
            
                // create the marker
                // new mapboxgl.Marker(el)
                
                    
                marker.setLngLat(propiedad)
                      .setPopup(popup) // sets a popup on this marker
                      .addTo(map);

                markers.push(marker); // push de marcadores al array markers
                    

            //         map.on('click', (event) => {
            //             // If the user clicked on one of your markers, get its information.
            //             const features = map.queryRenderedFeatures(event.point, {
            //               layers: ['YOUR_LAYER_NAME'] // replace with your layer name
            //             });
            //             if (!features.length) {
            //               return;
            //             }
            //             const feature = features[0];
                      
            //             // Code from the next step will go here.
            //           });
            })
            resolve()
        }
    ) 
    promiseMap.then(()=>{
          
        map.on('load', function () {
            map.resize();
        });
        map.on('style.load', () => {
            map.setFog({}); // Set the default atmosphere style

        });
    })
     

}

apiCallMap();
