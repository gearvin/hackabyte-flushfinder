import { Key } from "react";
import { GC_API_KEY, MAP_ID, unsw, bathrooms } from '../constants';
import { Map, AdvancedMarker, Pin, APIProvider, MapCameraChangedEvent} from "@vis.gl/react-google-maps";

function NearMeMap() {
  return (
        <APIProvider apiKey={GC_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
        <Map
          mapId={MAP_ID}
          defaultZoom={15}
          defaultCenter={unsw}
          onCameraChanged={ (ev: MapCameraChangedEvent) =>
          console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
          }
          reuseMaps={true}
        >
          {bathrooms.map((b: {
            location_name: string; id: Key; lat: number; lng: number; }) => (
            <AdvancedMarker 
              key={b.id} 
              position={{lat: b.lat, lng: b.lng}}
              onClick={() => console.log(`${b.location_name}`)} // implement show bathrooms here
            >
              <Pin 
                background={'#0f9d58'}
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