import React from 'react'
import { Link } from 'react-router'
import logo from '../assets/AdobeStock_1074530866.png'
import { Map, Plus, Search, Trophy } from 'lucide-react'

function Sidebar() {
  return (
    <nav className="h-full flex flex-col p-2 items-center bg-[#D9EAF0] gap-2">
      <Link role="button" to="/" >
        <img className="size-14" src={logo} alt="A roll of toilet paper" />
      </Link>
      <div className="w-full flex flex-col items-center border-t border-gray-400 py-4">
        <Link role="button" to="/" className="size-12 flex items-center justify-center rounded-md hover:bg-gray-300" >
          <Map color='#8E562E' />
        </Link>
        <Link role="button" to="/find" className="size-12 flex items-center justify-center rounded-md hover:bg-gray-300" >
          <Search color='#8E562E' />
        </Link>
        <Link role="button" to="/" className="size-12 flex items-center justify-center rounded-md hover:bg-gray-300" >
          <Trophy color='#8E562E' />
        </Link>
        <Link role="button" to="/" className="size-12 flex items-center justify-center rounded-md hover:bg-gray-300" >
          <Plus color='#8E562E' />
        </Link>
      </div>
    </nav>
  )
}

export default Sidebar