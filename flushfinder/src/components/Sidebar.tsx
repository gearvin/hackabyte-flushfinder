import React from 'react'
import { Link } from 'react-router'

function Sidebar() {
  return (
    <nav className="h-full flex flex-col p-2 bg-blue-300 gap-2">
      <Link role="button" to="/" > 🧻 </Link>
      <Link role="button" to="/find" > Find </Link>
    </nav>
  )
}

export default Sidebar