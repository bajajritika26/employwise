import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-950 py-4 shadow-md">
      <div className="container mx-auto p-4">
        <Link to="/" className="text-white text-2xl font-semibold italic">
          EmployWise
        </Link>
      </div>
      <hr className="border-t-2 border-white mt-2" />
    </nav>
  );
};

export default Navbar;
