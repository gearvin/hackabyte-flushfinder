import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import Sidebar from './components/Sidebar'
import FindPage from './pages/FindPage'
import TopPage from './pages/TopPage'
import AddPage from './pages/AddPage'
import ReviewPage from './pages/ReviewPage'

function App() {
  return (
    <div className="h-screen flex ">
      <Sidebar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/find' element={<FindPage />} />
        <Route path='/top' element={<TopPage />} />
        <Route path='/add' element={<AddPage />} />
        <Route path='/ratings/:id' element={<ReviewPage />}  />
      </Routes>
    </div>
  )
}

export default App
