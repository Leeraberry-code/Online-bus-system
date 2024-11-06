"use client";

import React, { useState } from "react";
import Logo from "../../../ui/logo";
import WidthContainer from "../../../ui/widthContainer";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { MenuIcon, ChevronDownIcon } from "@heroicons/react/solid";
import SettingsMenu from './updateprofile'; // Assuming this is already converted

type User = {
  name: string;
  username: string;
  email: string;
  profileImage: string;
  bio: string;
  phone: string;
  location: string;
  socialLinks: {
    twitter: string;
    linkedIn: string;
  };
};


 function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [pageAnchorEl, setPageAnchorEl] = useState<null | HTMLElement>(null);
  const [errors, setErrors] = useState<string | null>(null);
  const router = useRouter();

  const user: User = {
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    profileImage: "",
    bio: "This is my bio",
    phone: "123456789",
    location: "New York, USA",
    socialLinks: { twitter: "", linkedIn: "" },
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/account/logout");
      if (response.status === 200) {
        router.push("/login");
      } else {
        setErrors(response.data.message);
      }
    } catch (error: any) {
      setErrors(error.message);
    }
  };

  const toggleIncognito = () => {
    // Implement incognito toggle logic
  };

  const isIncognito = false;

  return (
    <nav className="bg-gradient-to-r from-blue-100 via-pink-100 to-yellow-100 fixed w-full top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-black">
            Strive High School
        </Link>

        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <Menu as="div" className="md:hidden">
            <Menu.Button className="text-black focus:outline-none">
              <MenuIcon className="h-6 w-6" />
            </Menu.Button>
            <Menu.Items className="absolute right-4 mt-2 w-48 bg-white border rounded-md shadow-lg">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/"
                    className={`${
                      active ? "bg-gray-100" : ""
                    } block px-4 py-2 text-sm text-gray-700`}
                  >
                    Home
                  </a>
                )}
              </Menu.Item>
              {/* Add additional menu items similarly */}
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/login"
                    className={`${
                      active ? "bg-gray-100" : ""
                    } block px-4 py-2 text-sm text-gray-700`}
                  >
                    Login
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/register"
                    className={`${
                      active ? "bg-gray-100" : ""
                    } block px-4 py-2 text-sm text-gray-700`}
                  >
                    Register
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard" className="text-black">
              Dashboard
            </Link>
            <Link href="/about" className="text-black">
              About
            </Link>
            <Link href="/contact" className="text-black">
              Contact
            </Link>
            <Menu as="div" className="relative">
              <Menu.Items className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg">
              </Menu.Items>
            </Menu>
            
          </div>
        </div>
      </div>
    </nav>
  );
}
