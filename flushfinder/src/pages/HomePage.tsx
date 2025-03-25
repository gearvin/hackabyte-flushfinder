import { useEffect, useState } from 'react';
import { unsw, zoom } from '../constants';
import female_toilets from '../data/bathrooms/female_toilets.json';
import male_toilets from '../data/bathrooms/male_toilets.json';
import unisex_toilets from '../data/bathrooms/unisex_toilets.json';
import buildings from '../data/buildings.json';
import { useMap, Map, AdvancedMarker, Pin, APIProvider} from "@vis.gl/react-google-maps";
import { Link } from 'react-router';
import { Accessibility, Image, Mars, Venus } from 'lucide-react';


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
          strokeColor: "#98fb98",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#98fb98",
          fillOpacity: 0.03,
          map,
          center: position,
          radius: 50
        });

        new google.maps.Circle({
          strokeColor: "#8F9779",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#8F9779",
          fillOpacity: 0.03,
          map,
          center: position,
          radius: 100
        });

        new google.maps.Circle({
          strokeColor: "#4B5320",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#4B5320",
          fillOpacity: 0.03,
          map,
          center: position,
          radius: 200
        });
      }
    }
  }, [map])

  return null
}

function Home() {
  const [buildingId, setBuildingId] = useState(0);
  return (
    <main className="flex-1 ml-14 md:ml-20">
      <div className="py-10 px-12 h-full flex flex-col gap-8">
        <h1 className="text-3xl font-serif font-semibold italic text-[#8E562E]"> Find the best seat in the house - before it's too late </h1>
        <div className="flex flex-1 h-full">
          <div className="flex-1 shadow-xl border-2 border-gray-200">
            <APIProvider apiKey={GM_API_KEY} libraries={["marker"]}>
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
                    <div className="w-5 h-5 bg-pink-500 rounded-full border-2 border-white shadow-md"></div>
                  </AdvancedMarker>
                ))}
                {male_toilets.map((b) => (
                  <AdvancedMarker 
                    key={b.id} 
                    position={b.position}
                    onClick={() => console.log(`${b}`)} // implement show bathrooms here
                  >
                    <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
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
                    <div className="w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
                  </AdvancedMarker>
                ))}
              </Map>
            </APIProvider>
          </div>
          <div className="h-full aspect-square divide-dashed divide-gray-300 shadow-2xl rounded-md">
            {buildings.filter((b) => b.id === buildingId).map((building) =>
              <Link
                role='button'
                to={`/ratings/${building.id}`}
                key={building.id}
                className="bg-gray-100 px-5 py-6 hover:shadow-md transition delay-75 flex flex-col gap-4 border-2 border-gray-200"
              >
                <div className="w-full h-40 bg-gray-300 rounded-sm flex justify-center items-center">
                  <Image color='gray' />
                </div>
                <p className="font-medium text-lg">{building.name}</p>
                <div className="flex mt-7 divide-x-2 divide-gray-300 text text-gray-600">
                  <div className="flex items-center gap-1 pr-2">
                    <span>{building.unisex_toilet_count}</span>
                    <Accessibility className="text-gray-600 text-xl" />
                  </div>

                  <div className="flex items-center gap-1 px-2">
                    <span>{building.male_toilets_count}</span>
                    <Mars className="text-blue-300 text-xl" />
                  </div>

                  <div className="flex items-center gap-1 pl-2">
                    <span>{building.female_toilets_count}</span>
                    <Venus className="text-pink-300 text-xl" />
                  </div>
                </div> 
                <p className="text-sm mt-9 text-gray-500">See all reviews</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  )
};

export default Home