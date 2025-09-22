import { Routes, Route, Link } from "react-router-dom";
import NavBar from './components/NavBar.jsx'
import './App.css'
import Problema1 from "./pages/Problema1.jsx";
import Home from "./pages/Home.jsx";
import Problema2 from "./pages/Problema2.jsx";
import Problema3 from "./pages/Problema3.jsx";
import Problema4 from "./pages/Problema4.jsx";
import Problema5 from "./pages/Problema5.jsx";
import Problema6 from "./pages/Problema6.jsx";
import Problema7 from "./pages/Problema7.jsx";
import problema8 from "./pages/Problema8.jsx";
//import problema9 from "./pages/Problema9.jsx";
import problema10 from "./pages/Problema10.jsx";
import Problema8 from "./pages/Problema8.jsx";
import Problema10 from "./pages/Problema10.jsx";
import Problema9 from "./pages/Problema9.jsx";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path='/' component={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path={'/problema/1'} element={<Problema1 />} />
                <Route path={'/problema/2'} element={<Problema2 />} />
                <Route path={'/problema/3'} element={<Problema3 />} />
                <Route path={'/problema/4'} element={<Problema4 />} />
                <Route path={'/problema/5'} element={<Problema5 />} />
                <Route path={'/problema/6'} element={<Problema6 />} />
                <Route path={'/problema/7'} element={<Problema7 />} />
                <Route path={'/problema/8'} element={<Problema8 />} />
                <Route path={'/problema/9'} element={<Problema9 />} />
                <Route path={'/problema/10'} element={<Problema10 />} />
            </Routes>
        </>
    );
}

export default App
