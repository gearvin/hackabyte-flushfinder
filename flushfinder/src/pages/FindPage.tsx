import { Accessibility, Image, ListFilter, Mars, Venus } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router';

const mockData = [
  {
    id: 1,
    name: "Law Building (F8)",
    building: "Law Building (F8), Floor G",
    rating: 2.45,
    accessibility: "All",
    numReviews: 15,
  },
  {
    id: 2,
    name: "GQ7",
    building: "Law Building (F8), Floor G",
    rating: 3.17,
    accessibility: "Female",
    numReviews: 4,
  },
  {
    id: 3,
    name: "247",
    building: "Chemical Sciences (F10), Floor L2",
    rating: 3.52,
    accessibility: "Male",
    numReviews: 7,
  },
  {
    id: 4,
    name: "6Q13",
    building: "UNSW Business School (E12), Floor L6",
    rating: 2.12,
    accessibility: "Male",
    numReviews: 3,
  },
  {
    id: 5,
    name: "799A",
    building: "Library (F21), Floor 7",
    rating: 4.04,
    accessibility: "Male",
    numReviews: 8,
  },
]

function FindPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState("none")
  // const [filteredData, setFilteredData] = useState(mockData);

  const filteredData = mockData.filter(toilet => {
    const query = searchQuery.toLowerCase();
    return (
      toilet.name.toLowerCase().includes(query) ||
      toilet.building.toLowerCase().includes(query)
    )
  }).sort((a, b) => {
    switch (sortOption) {
      case "name":
        return a.name.localeCompare(b.name);
      case "building":
        return a.building.localeCompare(b.building);
      case "highest-rating":
        return b.rating - a.rating;
      case "lowest-rating":
          return a.rating - b.rating;
      case "most-reviewed":
        return b.numReviews - a.numReviews;
      case "least-reviewed":
          return a.numReviews - b.numReviews;
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
        <div className="w-full mt-10 space-y-4">
          <div className="flex gap-4 flex-col md:flex-row">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              placeholder='Search...'
              className="flex-1 px-4 py-2 border rounded border-gray-400 outline-[#8E562E] bg-white"
            />
            <div className="flex gap-4">
              <select
                className="w-[150px] h-10 px-2 border rounded border-gray-400 outline-[#8E562E]"
                value={sortOption}
                onChange={(e) => setSortOption(e.currentTarget.value)}
              >
                <option value="name">Name (A-Z)</option>
                <option value="building">Building (A-Z)</option>
                <option value="highest-rating">Highest Rating</option>
                <option value="lowest-rating">Lowest Rating</option>
                <option value="most-reviewed">Most Reviewed</option>
                <option value="least-reviewed">Least Reviewed</option>
              </select>
            </div>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-sm gap-4">
            {filteredData.map(toilet => (
              <Link
                role='button'
                to={`/ratings/${toilet.id}`}
                key={toilet.id}
                className="bg-gray-50 px-5 py-6 hover:shadow-md transition delay-75 flex flex-col gap-4 border-2 border-gray-200"
              >
                <div className="w-full h-40 bg-gray-300 rounded-sm flex justify-center items-center">
                  <Image color='gray' />
                </div>
                <div>
                  <div className="flex justify-between">
                    <p className="font-medium text-lg">{toilet.name}</p>
                    {toilet.accessibility === "All" && <Accessibility />}
                    {toilet.accessibility === "Male" && <Mars color='lightblue' />}
                    {toilet.accessibility === "Female" && <Venus color='pink' />}
                  </div>
                  <p className="text-gray-600">{toilet.building}</p>
                  <div className="relative mt-2 w-[100px]">
                    <span className="absolute text-gray-300 text-xl">★★★★★</span>
                    <span
                      className="absolute text-yellow-700 text-xl overflow-hidden"
                      style={{ width: `${(toilet.rating / 5) * 100}%` }}
                    >
                      ★★★★★
                    </span>
                  </div>
                  <p className="text-sm mt-9 text-gray-500">See all {toilet.numReviews} reviews</p>
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