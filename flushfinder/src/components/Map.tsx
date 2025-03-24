import { Key } from "react";
import { unsw, bathrooms } from '../constants';
import { Map, AdvancedMarker, Pin, APIProvider, MapCameraChangedEvent} from "@vis.gl/react-google-maps";

const GM_API_KEY = import.meta.env.VITE_GM_API_KEY;
const GM_MAP_ID = import.meta.env.VITE_GM_FLUSHFINDER_MAP_ID;

function NearMeMap() {
  console.log(import.meta.env);
  return (
        <APIProvider apiKey={GM_API_KEY} onLoad={() => console.log(`Maps API has loaded`)}>
        <Map
          mapId={GM_MAP_ID}
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