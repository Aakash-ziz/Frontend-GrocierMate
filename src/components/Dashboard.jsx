import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Home from "./contents/Home";
import Selling from "./contents/Selling";
import Buying from "./contents/Buying";

function Dashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("home");

  const handleNavigation = (page) => {
    setActivePage(page);
    navigate(`/${page}`);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">Grociermate</div>
          {/* Links */}
          <div className="space-x-4">
            <button
              onClick={() => handleNavigation("home")}
              className="hover:text-gray-300 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("selling")}
              className="hover:text-gray-300 transition-colors"
            >
              Selling
            </button>
            <button
              onClick={() => handleNavigation("buying")}
              className="hover:text-gray-300 transition-colors"
            >
              Buying
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto mt-8 p-4">
        {/* Render the appropriate component based on the active page */}
        {activePage === "home" && <Home />}
        {activePage === "selling" && <Selling />}
        {activePage === "buying" && <Buying />}
      </div>
    </div>
  );
}

export default Dashboard;
