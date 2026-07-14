import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Navbar from './components/layout/Navbar';


function App() {
  return <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
}

export default App
