import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Dashboard from "./pages/Dashboard"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Header from "./components/Header"
import FooterComp from "./components/FooterComp"

export default function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={ <Home /> }></Route>
            <Route path="/about" element={ <About />}></Route>
            <Route path="/projects" element={<Projects />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={ <SignUp />}></Route>
        </Routes>
        <FooterComp />
    </BrowserRouter>
  )
}
