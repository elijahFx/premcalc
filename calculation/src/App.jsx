import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Month from './components/Month.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import NotFound from './components/NotFound.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import TrashBin from './components/Trashbin/Trashbin.jsx'
import EmployerPanel from './components/Employer/EmployerPanel.jsx'
import Worker from './components/Employer/Worker.jsx'
import Account from './components/Account.jsx'
import SuiteMaker from './components/SuiteMaker.jsx'

function App() {

  const user = useSelector(state => state.users.user)


  return (
    <div className="container">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={!user ? <Login /> : <Month />}/>
            <Route path="/signup" element={!user ? <Signup /> : <Month />}/>
            <Route path="/account" element={!user ? <Signup /> : <Account />}/>
            <Route path="/employer/" element={user?.role === "employer" ? <EmployerPanel /> : <NotFound />}/>
            <Route path="/employer/:id" element={<Worker />}/>
            <Route path="/trashbin" element={!user ? <Login /> : <TrashBin />}/>
            <Route path="/suitemaker" element={<SuiteMaker /> }/>
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
