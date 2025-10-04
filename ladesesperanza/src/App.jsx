import React from 'react';
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import UserRegistrationForm from "./pages/UserRegistrationForm.jsx";
import UserSearch from "./pages/UserSearch.jsx";
import UserDeletionForm from "./pages/UserDeletion.jsx";
import UserUpdateForm from "./pages/UpdateUserForm.jsx";

function App() {

  return (
      <>
          <Header />
          <Routes>
              <Route path="/" element={ <Home />} />
              <Route path='/register' element={ <UserRegistrationForm />} />
              <Route path='/search' element={ <UserSearch />} />
              <Route path={'/delete'} element={ <UserDeletionForm />}/>
              <Route path={'/update'} element={<UserUpdateForm />}></Route>
          </Routes>
          <Footer />
      </>
  )
}
export default App
