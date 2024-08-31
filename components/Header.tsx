"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import Menu from "./Menu";
import SearchField from "./SearchField";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { useQueryClient } from "@tanstack/react-query";


function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const currentPath = usePathname();
  const queryClient = useQueryClient();

  const isActive = (href: string) => currentPath === href;
  
  // Clear the query cache when the user signs out
  useEffect(() => {
    const handleSignOut = () => {
      queryClient.clear();
    };

    // Assuming you can listen to sign out events, e.g., from a global auth state or directly from Clerk's state management
    window.addEventListener("signedOut", handleSignOut);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("signedOut", handleSignOut);
    };
  }, [queryClient]);

  return (
    <div className="flex flex-col sm:flex-row items-center p-2 max-w-6xl mx-auto">
      {/* Top Bar for Small Screens */}
      <div className="flex items-center justify-between w-full sm:hidden">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <Image
            className="rounded-lg"
            src="/blink-icon.png"
            width={50}
            height={50}
            alt="logo"
          />

          {/* Search Icon (Minimized) */}
          <div
            className={`flex items-center bg-gray-100 p-2 rounded-md transition-all duration-300 ease-in-out ${
              isSearchExpanded ? "flex-1 max-w-full" : "w-10"
            }`}
            onClick={() => setIsSearchExpanded(true)}
          >
            <SearchField />
          </div>
        </div>

        {/* Menu component for small screens */}
        <div className="sm:hidden flex items-center space-x-4">
          <Menu />
          
          <SignedIn>
            <UserButton />
          </SignedIn>
          <ModeToggle />
        </div>
      </div>

      {/* Bottom Icons for Small Screens */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t sm:hidden flex justify-between items-center p-2 z-50">
        <Link
          href="/"
          className={`icon cursor-pointer ${
            isActive("/") ? "text-blue" : "hover:text-gray-700"
          }`}
        >
          <Image src="/Home.png" alt="" width={20} height={20} />
        </Link>

        <Link
          href="/notifications"
          className={`icon cursor-pointer ${
            isActive("/notifications") ? "text-blue" : "hover:text-gray-700"
          }`}
        >
          <Image src="/Notifications.png" alt="" width={20} height={20} />
        </Link>

        <Link
          href="/add"
          className={`icon cursor-pointer ${
            isActive("/add") ? "text-blue" : "hover:text-gray-700"
          }`}
        >
          <Image src="/Add.png" alt="" width={20} height={20} />
        </Link>

        <Link
          href="/users"
          className={`icon cursor-pointer ${
            isActive("/users") ? "text-blue" : "hover:text-gray-700"
          }`}
        >
          <Image src="/Users.png" alt="" width={20} height={20} />
        </Link>

        <Link
          href="/groups"
          className={`icon cursor-pointer ${
            isActive("/groups") ? "text-blue" : "hover:text-gray-700"
          }`}
        >
          <Image src="/BLinks.png" alt="" width={20} height={20} />
        </Link>
      </div>

      {/* Original Layout for Large Screens */}
      <div className="hidden sm:flex items-center p-2 w-full justify-between">
        <Image
          className="rounded-lg"
          src="/blink-icon.png"
          width={50}
          height={50}
          alt="logo"
        />

        {/* Search */}
        <div className="flex-1">
          <SearchField />
        </div>

        <div className="flex items-center space-x-4 px-6">
          <Link
            href="/"
            className={`icon cursor-pointer hover:bg-slate-100 active:border-b-2 active:border-blue-500 ${
              isActive("/") ? "text-black" : "hover:text-gray-700"
            }`}
          >
            <Image src="/Home.png" alt="" width={20} height={20} />
            <p className="hidden sm:block">Home</p>
          </Link>

          <Link
            href="/notifications"
            className={`icon cursor-pointer hover:bg-slate-100 active:border-b-2 active:border-blue-500 ${
              isActive("/notifications") ? "text-black" : "hover:text-gray-700"
            }`}
          >
            <Image src="/Notifications.png" alt="" width={20} height={20} />
            <p className="hidden sm:block">Notifications</p>
          </Link>

          <Link
            href="/add"
            className={`icon cursor-pointer hover:bg-slate-100 active:border-b-2 active:border-blue-500 ${
              isActive("/add") ? "text-black" : "hover:text-gray-700"
            }`}
          >
            <Image src="/Add.png" alt="" width={20} height={20} />
            <p className="hidden sm:block">Add</p>
          </Link>

          <Link
            href="/users"
            className={`icon cursor-pointer hover:bg-slate-100 active:border-b-2 active:border-blue-500 ${
              isActive("/users") ? "text-black" : "hover:text-gray-700"
            }`}
          >
            <Image src="/Users.png" alt="" width={20} height={20} />
            <p className="hidden sm:block">Users</p>
          </Link>

          <Link
            href="/groups"
            className={`icon cursor-pointer hover:bg-slate-100 active:border-b-2 active:border-blue-500 ${
              isActive("/groups") ? "text-black" : "hover:text-gray-700"
            }`}
          >
            <Image src="/BLinks.png" alt="" width={20} height={20} />
            <p className="hidden sm:block">BLinks</p>
          </Link>

          

          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <Button asChild variant="secondary">
            queryClient.clear();
              <SignInButton />
            </Button>
          </SignedOut>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Header;
