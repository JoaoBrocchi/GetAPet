import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Home from "./components/pages/auth/Home";
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';








function App() {
  return (
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    <Footer/>
    </Router>
  );
}

export default App;
