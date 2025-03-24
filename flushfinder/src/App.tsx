import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import Sidebar from './components/Sidebar'
import FindPage from './pages/FindPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="h-screen flex">
      <Sidebar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/find' element={<FindPage />}  />
        <Route path='/review/:id'  />
      </Routes>
    </div>
  )
}

export default App
