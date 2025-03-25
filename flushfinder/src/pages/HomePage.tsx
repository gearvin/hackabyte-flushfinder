import React from 'react';
import NearMeMap from '../components/Map';

function Home() {
  return (
    <main className="flex-1 ml-14 md:ml-20">
      <div className="py-10 px-12 h-full flex flex-col gap-8">
        <h1 className="text-3xl font-serif font-semibold italic text-[#8E562E]"> Find the best seat in the house - before it's too late </h1>
        <div className="flex flex-1 h-full">
          <div className="flex-1 shadow-xl border-2 border-gray-200">
            <NearMeMap></NearMeMap>
          </div>
          <div className="w-sm h-full">

          </div>
        </div>
      </div>
    </main>
  )
};

export default Home