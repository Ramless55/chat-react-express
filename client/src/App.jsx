import { Route, Routes, useLocation } from "react-router-dom"
import Chat from './pages/Chat'
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoutes from "./components/ProtectedRoutes"
import { useLogin } from "./store/useLogin"

function App () {
  const location = useLocation()

  const isLogged = useLogin(state => state.isLogged)

  return (
    <>
      <Routes key={location.pathname} location={location}>
        <Route path="/chat" element={<ProtectedRoutes user={isLogged}> <Chat /> </ProtectedRoutes>} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
