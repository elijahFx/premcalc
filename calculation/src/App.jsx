import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Month from './components/Month.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import { Routes, BrowserRouter, Route } from "react-router-dom"

function App() {

  return (
<div className='container'>
	<Navbar/>
		<BrowserRouter>

        <div className="pages">
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/cases" element={<Month />}/>
          </Routes>
        </div>
      </BrowserRouter>
 <Footer />
</div>

  )
}

export default App
