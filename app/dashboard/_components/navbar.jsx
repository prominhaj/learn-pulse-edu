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

export const Navbar = () => {
  const { user, status } = useAuth();

  return (
    <div className="flex items-center h-full p-4 border-b shadow-sm bg-background">
      <MobileSidebar />
      <div className="flex items-center justify-end w-full gap-5">
        <ThemeSwitch />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              {
                status === "loading" ? <Spinner className="!w-6 !h-6" /> : (
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
              <Link href="">Item One</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link href="">Item Two</Link>
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
