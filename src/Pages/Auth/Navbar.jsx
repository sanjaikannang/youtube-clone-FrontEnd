import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
      <div className="text-xl text-grey font-semibold">
        <span className="text-red-500 font-bold">You </span>
        Tube
      </div>
      <div className="relative inline-block text-left">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          type="button"
          className="rounded-md "
        >
          <FontAwesomeIcon
            icon={faCircleUser}
            size="xl"
            style={{ color: "#f44336", marginRight: "8px" }}
          />
        </button>

        {showDropdown && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="none">
              <Link
                to="/myprofile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
