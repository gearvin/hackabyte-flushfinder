import { Key } from "react";
import { unsw, zoom } from '../constants';
import female_toilets from '../data/bathrooms/female_toilets.json';
import male_toilets from '../data/bathrooms/male_toilets.json';
import unisex_toilets from '../data/bathrooms/unisex_toilets.json';
import { Map, AdvancedMarker, Pin, APIProvider, MapCameraChangedEvent} from "@vis.gl/react-google-maps";

const GM_API_KEY = import.meta.env.VITE_GM_API_KEY;
const GM_MAP_ID = import.meta.env.VITE_GM_FLUSHFINDER_MAP_ID;

function NearMeMap() {
  console.log(import.meta.env);
  return (
        <APIProvider apiKey={GM_API_KEY} onLoad={() => console.log(`Maps API has loaded`)}>
        <Map
          mapId={GM_MAP_ID}
          defaultZoom={zoom}
          defaultCenter={unsw}
          onCameraChanged={ (ev: MapCameraChangedEvent) =>
          console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
          }
          reuseMaps={true}
        >
          {female_toilets.map((b) => (
            <AdvancedMarker 
              key={b.id} 
              position={b.position}
              onClick={() => console.log(`${b}`)} // implement show bathrooms here
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
              onClick={() => console.log(`${b}`)} // implement show bathrooms here
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