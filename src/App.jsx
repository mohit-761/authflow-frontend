import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import EditProfile from './pages/EditProfile';
import EditProfilePhoto from './pages/EditProfilePhoto';
import EditPassword from './pages/ChangePassword';
import ForgetPassword from './pages/ForgetPassword';


function App() {
  return <BrowserRouter>
    <Navbar />
    <Routes>

      <Route path='/' element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />

      <Route path='/register' element={
        <PublicRoute>
          <Register />
        </PublicRoute>} />

      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

      <Route path='/profile' element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />

      <Route path='/profile/edit' element={
        <ProtectedRoute>
          <EditProfile />
        </ProtectedRoute>
      } />

      <Route path='/profile/edit-avatar' element={
        <ProtectedRoute>
          <EditProfilePhoto />
        </ProtectedRoute>
      } />

      <Route path='/profile/change-password' element={
        <ProtectedRoute>
          <EditPassword />
        </ProtectedRoute>
      } />

      <Route path='/profile/forget-password' element={
        <PublicRoute>
          <ForgetPassword />
        </PublicRoute>
      } />


      <Route path='*' element={<NotFound />} />

    </Routes>
  </BrowserRouter>
}

export default App
