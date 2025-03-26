import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import Sidebar from './components/Sidebar'
import FindPage from './pages/FindPage'
import TopPage from './pages/TopPage'
// import AddPage from './pages/AddPage'
import ReviewPage from './pages/ReviewPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="h-screen flex ">
      <QueryClientProvider client={queryClient}>
        <Sidebar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/find' element={<FindPage />} />
          {/* <Route path='/top' element={<TopPage />} /> */}
          {/* <Route path='/add' element={<AddPage />} /> */}
          <Route path='/ratings/:id' element={<ReviewPage />}  />
        </Routes>
      </QueryClientProvider>
    </div>
  )
}

export default App
