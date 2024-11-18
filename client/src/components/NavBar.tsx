"use client"
import Link from "next/link";
import Logo from "../ui/logo";
import WidthContainer from "../ui/widthContainer";
import { useEffect, useState } from "react";

export default function NavBar() {
  return (
    <div className="navbar fixed top-0 left-0 w-full bg-white p-4 shadow-md">
      <WidthContainer>
        <div className="flex items-center justify-between w-full">
          <Logo className="font-bold text-xl" />
          <AuthNav />
        </div>
      </WidthContainer>
    </div>
  );
}

function AuthNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user data is in localStorage
    const user = localStorage.getItem("user_id"); // or use 'token' if you're using tokens
    setIsLoggedIn(!!user); // Set state to true if user exists
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_type"); // Clear other relevant user data
    setIsLoggedIn(false); // Update state
    // Optionally redirect to the login page
    window.location.href = "/login";
  };

  return (
    <div className="space-x-2">
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="btn btn-primary px-4 py-2 bg-black text-white rounded-md"
        >
          Logout
        </button>
      ) : (
        <>
          <Link href="/login" className="btn btn-outline px-4 py-2 border rounded-md">
            Log In
          </Link>
          <Link href="/register" className="btn btn-primary px-4 py-2 bg-black text-white rounded-md">
            Register
          </Link>
        </>
      )}
    </div>
  );
}
