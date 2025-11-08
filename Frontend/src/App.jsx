import Navbar from './components/Navbar'
import Home from "./pages/Home"
import Footer from './components/Footer'
import SignupForm from './components/SignupForm';
// import { AuthProvider } from "./components/AuthContext";
import ContactUs from './components/ContactUs';
import SellerDashboard from './pages/SellerDashboard';
import About from './components/About';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm';
import Cart from './components/Cart';

function App() {
   

  return (
    <>
     <main className="bg-primary text-tertiary">
      {/* <AuthProvider> */}
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/contactus' element={<ContactUs/>}/> 
         <Route path='/about' element={<About/>}/> 
         <Route path='/login' element={<LoginForm/>}/>
         <Route path='/signup' element={<SignupForm/>}/>
         <Route path='/sell' element={<SellerDashboard/>}/>
         <Route path='/cart' element={<Cart/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
      {/* </AuthProvider> */}
     </main>
    </>
  )
}

export default App
