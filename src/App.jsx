import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UsersList from "./pages/UsersList";
import Login from "./pages/login";
import EditUser from "./pages/EditUser";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
