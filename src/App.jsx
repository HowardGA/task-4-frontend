import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPanel from './pages/AdminPanel';
import Layout from './components/Layout';

function App() {

  return (
    <div className="container-fluid px-0 min-vh-100 d-flex flex-column bg-light">
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
            <Route path="admin" element={<AdminPanel />} />
          </Route>
      </Routes>
    </div>
  )
}

export default App
