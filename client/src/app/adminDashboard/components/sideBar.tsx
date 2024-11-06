"use client";
import React from "react";
import {
  UserGroupIcon,
  BusIcon,
  BookOpen,
  HomeIcon,
} from "@heroicons/react/outline";

interface SidebarProps {
  selectedComponent: string;
  setSelectedComponent: (component: string) => void;
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedComponent,
  setSelectedComponent,
  handleDrawerToggle,
  mobileOpen,
}) => {
  const sidebarItems = [
    { text: "Overview", icon: <HomeIcon className="w-5 h-5" /> },
    { text: "Users", icon: <UserGroupIcon className="w-5 h-5" /> },
    { text: "Buses", icon: <BusIcon className="w-5 h-5" /> },
    { text: "Learners", icon: <BookOpen className="w-5 h-5" /> },
  ];

  const sidebarContent = (
    <div className="w-full h-full bg-gradient-to-r from-blue-100 to-orange-100 p-4 overflow-y-auto">
      <ul>
        {sidebarItems.map((item) => (
          <li
            key={item.text}
            className={`flex items-center px-4 py-2 my-1 rounded-md cursor-pointer ${
              selectedComponent === item.text
                ? "bg-gray-300 text-blue-600"
                : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setSelectedComponent(item.text);
              if (mobileOpen) handleDrawerToggle();
            }}
          >
            <div
              className={`mr-3 ${
                selectedComponent === item.text ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {item.icon}
            </div>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex sm:hidden"
          onClick={handleDrawerToggle}
        >
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative flex flex-col w-full max-w-xs bg-white">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <nav className="hidden sm:block w-60 flex-shrink-0">
        <div className="fixed top-16 w-60 h-[calc(100%-64px)] bg-white">
          {sidebarContent}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
