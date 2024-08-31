 "use client";

import { useState } from "react";
import { Menu as MenuIcon } from "lucide-react";

import Link from "next/link";




const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  
  return (
    <div className="relative">
      <button onClick={toggleMenu} className="flex items-center p-2 rounded-md hover:bg-gray-100">
        <MenuIcon className="h-5 text-black" />
        <span className="ml-2 text-black">Menu</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
          <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
          <Link href="/blinks" className="block px-4 py-2 hover:bg-gray-100">My B-Links</Link>
          <Link href="/bookmark" className="block px-4 py-2 hover:bg-gray-100">Bookmarks</Link>
          <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
          
          
          
          
        </div>
      )}
    </div>
  );
};

export default Menu;
