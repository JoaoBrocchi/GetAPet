import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Home from "./components/pages/auth/Home";
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Container from "./components/layouts/Container.js"
import { Context, UserProvider } from './context/UserContext';
import Message from "./components/layouts/Message"
import Profile from "./components/pages/users/Profile";
import Mypets from "./components/pages/pets/Mypets";
import AddPet from "./components/pages/pets/AddPet";
import EditPet from './components/pages/pets/EditPet';
import PetDetail from './components/pages/pets/PetDetails';
import MyAdoptions from "./components/pages/pets/MyAdoptions"

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar/>
          <Container>
          <Message/>
            <Routes>
              <Route path='/pet/mypets' element={<Mypets/>}/>
              <Route path='/pet/myadoptions' element={<MyAdoptions/>}/>
              <Route path='/pet/add/:id' element={<AddPet/>}/>
              <Route path='/pet/edit/:id' element={<EditPet/>}/>
              <Route path='/pet/:id' element={<PetDetail/>}/>
              <Route path="/user/profile" element={<Profile/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="/user/profile" element={<Profile/>} />
            </Routes>
          </Container>
        <Footer/>
      </UserProvider>
    </Router>
  );
}

export default App;
