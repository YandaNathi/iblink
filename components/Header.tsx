import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  
  House,
  Bell,
  Plus,
  BriefcaseBusiness,
  Users,
  SearchIcon,
  Menu,

} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";




async function Header() {
  
  return (
    <div className="flex items-center p-2 max-w-6xl mx-auto">
      {/* Logo */}
      <Image
        className="rounded-lg"
        src="/blink-icon.png"
        width={50}
        height={50}
        alt="logo"
      />



      
{/* Search */}
{/* SearchIcon */}
<div className="flex-1">
  <form className="flex items-center space-x-1 bg-gray-100 p-2 rounded-md flex-1 mx-2 max-w-96">
    <SearchIcon className="h-4 text-gray-600" />
    <input
      type="text"
      placeholder="Search iBLink"
      className="bg-transparent flex-1 outline-none"
    />
  </form>
  
  </div>

      <div className="flex items-center space-x-4 px-6">
        <Link href="" className="icon cursor-pointer hover:bg-slate-100 active:border-b-2 active:border-blue-500 ">
          <Image src="/Home.png" alt="" width={20} height={20}/>
          <p className="hidden sm:block">Home</p>
        </Link>

        <Link href="" className="icon cursor-pointer hover:bg-slate-100 active:border-b-2 active:border-blue-500">
        <Image src="/Notifications.png" alt="" width={20} height={20}/>
          <p className="hidden sm:block">Notifications</p>
        </Link>


        <Link href="" className="icon cursor-pointer hover:bg-slate-100 active:border-b-2 active:border-blue-500">
        <Image src="/Add.png" alt="" width={20} height={20}/>
          <p className="hidden sm:block" >Add</p>
        </Link>

        <Link href="" className="icon cursor-pointer hover:bg-slate-100 active:border-b-2 active:border-blue-500">
        <Image src="/Users.png" alt="" width={20} height={20}/>
          <p className="hidden sm:block" >Users</p>
        </Link>

        <Link href="" className="icon cursor-pointer hover:bg-slate-100 active:border-b-2 active:border-blue-500">
        <Image src="/BLinks.png" alt="" width={20} height={20}/>
          <p className="hidden sm:block">BLinks</p>
        </Link>

      
        

        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <Button asChild variant="secondary">
            <SignInButton />
          </Button>
        </SignedOut>

        <Link href="" className="icon cursor-pointer hover:bg-slate-100 active:border-b-2 active:border-blue-500">
          <Menu className="h-5  text-black" />
          <p className="text-black">Menu</p>
        </Link>
        
    
        
  
          
        </div>
      </div>
    
  );
}

export default Header;
