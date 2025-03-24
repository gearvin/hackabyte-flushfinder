import React from 'react';
import NearMeMap from '../components/Map';

function Home() {
  return (
    <main className="ml-[300px] w-full p-6">
      <div> find the best seat in the house - before it's too late </div>
      <NearMeMap></NearMeMap>
    </main>
  )
};

export default Home