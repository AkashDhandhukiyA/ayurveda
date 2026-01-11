import './App.css'
import Header from './components/Header'
import Footer from './components/footer'

import { Outlet } from 'react-router-dom'
import Home from './components/home';


function App() {


  return (
    <>
     <Header></Header>
     <Outlet></Outlet>
    
     <Footer></Footer>
    </>
  )
}

export default App
