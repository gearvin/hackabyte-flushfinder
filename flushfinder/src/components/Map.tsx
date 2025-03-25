import { use, useEffect, useState } from 'react';
import { unsw, zoom } from '../constants';
import female_toilets from '../data/bathrooms/female_toilets.json';
import male_toilets from '../data/bathrooms/male_toilets.json';
import unisex_toilets from '../data/bathrooms/unisex_toilets.json';
import buildings from '../data/buildings.json';
import { useMap, Map, AdvancedMarker, Pin, APIProvider} from "@vis.gl/react-google-maps";

const GM_API_KEY = import.meta.env.VITE_GM_API_KEY;
const GM_MAP_ID = import.meta.env.VITE_GM_FLUSHFINDER_MAP_ID;

function MapFunctions() {
  const map = useMap();
  const [position, setPosition] = useState(unsw)

  useEffect(() => {
    if (map) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (p) => {
            setPosition({"lat": p.coords.latitude, "lng": p.coords.longitude})
            console.log(`location obtained: ${position}`)
            map.panTo(position)
          },
          (error) => {
            console.error(`Error getting location ${error.message}`)
          }
        );

        // Current location marker
        new google.maps.marker.AdvancedMarkerElement({
          position: position,
          map: map,
          title: "current_location"
        })

        // create a radius around the person's current location
        new google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.1,
          map,
          center: position,
          radius: 50
        });

        new google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.1,
          map,
          center: position,
          radius: 100
        });

        new google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.1,
          map,
          center: position,
          radius: 200
        });
      }
    }
  }, [map])

  return null
}

function NearMeMap() {
  const [buildingId, setBuildingId] = useState(0);
  useEffect(() => {
    if (buildingId) {
      console.log(buildings.filter((b) => b.id === buildingId)[0])
    }
  })
  return (
    <APIProvider apiKey={GM_API_KEY} onLoad={() => console.log(`Maps API has loaded`)}>
    <Map
      mapId={GM_MAP_ID}
      defaultZoom={zoom}
      defaultCenter={unsw}
      onCameraChanged={ (ev) =>
      console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
      }
      reuseMaps={true}
    >
      <MapFunctions/>
      {female_toilets.map((b) => (
        <AdvancedMarker 
          key={b.id} 
          position={b.position}
          onClick={() => 
            console.log(`${b}`)
          } // implement show bathrooms here
        >
          <Pin // Replace with female icon 
            background={'#FFC0CB'}
            borderColor={'#006425'}
            glyphColor={'#60d98f'}
          />
        </AdvancedMarker>
      ))}
      {male_toilets.map((b) => (
        <AdvancedMarker 
          key={b.id} 
          position={b.position}
          onClick={() => console.log(`${b}`)} // implement show bathrooms here
        >
          <Pin // replace with male icon
            background={'#0000FF'}
            borderColor={'#006425'}
            glyphColor={'#60d98f'}
          />
        </AdvancedMarker>
      ))}
      {unisex_toilets.map((b) => (
        <AdvancedMarker 
          key={b.id} 
          position={b.position}
          onClick={() => 
            setBuildingId(b.buildingId)
          }

        >
          <Pin // replace with unisex icon
            background={'#00FF00'}
            borderColor={'#006425'}
            glyphColor={'#60d98f'}
          />
        </AdvancedMarker>
      ))}
    </Map>
    </APIProvider>
  )
}

export default NearMeMap;