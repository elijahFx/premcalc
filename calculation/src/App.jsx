import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Month from './components/Month.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import NotFound from './components/NotFound.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom"
import { useSelector } from 'react-redux'




function App() {

  const user = useSelector(state => state.users.user)
  console.log(user);

  return (
<div className='container'>
	<Navbar/>
		<BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={!user ? <Login /> : <Month />}/>
            <Route path="/signup" element={!user ? <Signup /> : <Month />}/>
            <Route path="/admin" element={user?.role === "admin" ? <AdminPanel /> : <NotFound />}/>
            <Route path="/*" element={<NotFound />}/>
          </Routes>
        </div>
      </BrowserRouter>
 <Footer />
</div>

  )
}

export default App
