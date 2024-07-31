"use client";
import { MobileSidebar } from "./mobile-sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import Spinner from "@/components/globals/Spinner/Spinner";
import { signOut } from "next-auth/react";
import ThemeSwitch from "@/components/globals/ThemeSwitch/ThemeSwitch";
import Refresh from "@/components/globals/Refresh/Refresh";

export const Navbar = () => {
  const { user, status } = useAuth();
  const userName = user?.firstName + " " + user?.lastName;

  return (
    <div className="flex items-center h-full p-4 border-b shadow-sm bg-background">
      <MobileSidebar />
      <div className="flex items-center justify-end w-full gap-5">
        <Refresh />
        <ThemeSwitch />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              {
                status === "loading" ? <Spinner size={true} /> : (
                  <Avatar>
                    <AvatarImage
                      src={user?.profilePicture?.url}
                      alt={user?.firstName}
                    />
                    <AvatarFallback>{user?.firstName.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                )
              }
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-4">
            <DropdownMenuItem className="cursor-pointer">
              <button className="flex items-center gap-1.5 flex-wrap">
                <span>
                  {userName}
                </span>
                <span>
                  ({user?.role})
                </span>
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link href="/account">Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <button onClick={() => signOut()} className="flex items-start justify-start w-full">Logout</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
