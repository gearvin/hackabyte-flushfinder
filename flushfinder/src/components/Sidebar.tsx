import { Link } from 'react-router'
import logo from '../assets/AdobeStock_1074530866.png'
import { Map, Plus, Search, Trophy } from 'lucide-react'

function Sidebar() {
  return (
    <nav className="fixed h-full flex flex-col w-14 md:w-20 p-2 items-center bg-[#D9EAF0] gap-2">
      <Link role="button" to="/" >
        <img className="size-14" src={logo} alt="A roll of toilet paper" />
      </Link>
      <div className="flex flex-col items-center border-t-2 border-gray-300 gap-1 py-4">
        <Link role="button" to="/" className="size-12 flex items-center justify-center rounded-md hover:bg-gray-300" >
          <Map color='#8E562E' />
        </Link>
        <Link role="button" to="/find" className="size-12 flex items-center justify-center rounded-md hover:bg-gray-300" >
          <Search color='#8E562E' />
        </Link>
        {/* <Link role="button" to="/top" className="size-12 flex items-center justify-center rounded-md hover:bg-gray-300" >
          <Trophy color='#8E562E' />
        </Link> */}
        {/* <Link role="button" to="/add" className="size-12 flex items-center justify-center rounded-md hover:bg-gray-300" >
          <Plus color='#8E562E' />
        </Link> */}
      </div>
    </nav>
  )
}

export default Sidebar