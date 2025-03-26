import { Accessibility, Image, ListFilter, Mars, Venus } from 'lucide-react';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link } from 'react-router';
import buildingData from '../data/buildings.json'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5300/api';

function FindPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState("none")
  
  const { isPending, isError, data, error } = useQuery({
    queryKey: [' buildings'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/buildings`, {
        headers: {
          'x-api-key': 'toilet-finder-api-key-hackathon-2025'
        }
      })
      return response.data
    },
    
  });

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [isPending, data])

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  // const [filteredData, setFilteredData] = useState(mockData);

  const filteredData = data.filter(building => {
    const query = searchQuery.toLowerCase();
    return (
      building.name.toLowerCase().includes(query) ||
      building.building.toLowerCase().includes(query)
    )
  }).sort((a, b) => {
    switch (sortOption) {
      case "name":
        return a.name.localeCompare(b.name);
      // case "building":
      //   return a.building.localeCompare(b.building);
      case "highest-rating":
        return b.average_overall - a.average_overall;
      case "lowest-rating":
          return a.average_overall - b.average_overall;
      case "most-reviewed":
        return b.reviews_count - a.reviews_count;
      case "least-reviewed":
          return a.reviews_count - b.reviews_count;
      default:
        return 0
    }
  });

  return (
    <div 
      className="flex-1 ml-14 md:ml-20"
      // style={{
      //   backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23d9eaf0' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/svg%3E\")"
      // }}
    >

      <div className="mx-auto max-w-6xl py-10 px-6">
        <h1 className="text-3xl font-semibold italic font-serif text-[#8E562E]">The Directory</h1>
        <h2 className="text-gray-500 text-lg">Browse at your leisure...</h2>
        <div className="w-full mt-10 space-y-2">
          <div className="flex gap-2 flex-col md:flex-row">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              placeholder='Search...'
              className="flex-1 px-4 py-1 border-2 rounded border-gray-300 outline-[#8E562E] bg-white"
            />
            <select
              className="w-[200px] h-10 px-2 border-2 rounded border-gray-300 outline-[#8E562E]"
              value={sortOption}
              onChange={(e) => setSortOption(e.currentTarget.value)}
            >
              <option value="name">Name (A-Z)</option>
              {/* <option value="building">Building (A-Z)</option> */}
              <option value="highest-rating">Highest Rating</option>
              <option value="lowest-rating">Lowest Rating</option>
              <option value="most-reviewed">Most Reviewed</option>
              <option value="least-reviewed">Least Reviewed</option>
            </select>


          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-sm gap-1">
            {filteredData.map(building => (
              <Link
                role='button'
                to={`/ratings/${building.id}`}
                key={building.id}
                className="bg-gray-100 px-5 py-6 hover:shadow-md transition delay-75 flex flex-col gap-4 border-2 border-gray-200"
              >
                <div className="w-full h-40 bg-gray-300 rounded-sm flex justify-center items-center">
                  <Image color='gray' />
                </div>
                <div>
                  <p className="font-medium text-lg">{building.name}</p>
                  {/* <div className="flex justify-between">
                    {building.accessibility === "All" && <Accessibility />}
                    {building.accessibility === "Male" && <Mars color='lightblue' />}
                    {building.accessibility === "Female" && <Venus color='pink' />}
                  </div> */}
                  <div className="flex divide-x-2 divide-gray-300 text text-gray-600">
                    <div className="flex items-center gap-1 pr-2">
                      <span>{building.unisex_toilet_count}</span>
                      <Accessibility className="text-gray-600" size={20} />
                    </div>

                    <div className="flex items-center gap-1 px-2">
                      <span>{building.male_toilets_count}</span>
                      <Mars className="text-blue-300" size={20} />
                    </div>

                    <div className="flex items-center gap-1 pl-2">
                      <span>{building.female_toilets_count}</span>
                      <Venus className="text-pink-300" size={20} />
                    </div>
                  </div>
                  {/* <p className="text-gray-600">{building.building}</p> */}
                  <div className="relative mt-2 w-[100px]">
                    <span className="absolute text-gray-300 text-xl">★★★★★</span>
                    <span
                      className="absolute text-yellow-700 text-xl overflow-hidden"
                      style={{ width: `${(building.average_overall / 5) * 100}%` }}
                    >
                      ★★★★★
                    </span>
                  </div>
                  <p className="text-sm mt-9 text-gray-500">See all {building.reviews_count} reviews</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FindPage