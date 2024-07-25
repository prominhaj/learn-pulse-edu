"use client";
import Link from "next/link";
import Logo from "../Logo/Logo";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { MobileNav } from "./MobileNav/MobileNav";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import useAuth from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import Spinner from "../Spinner/Spinner";
import { signOut } from "next-auth/react";

// Nav Items
const navLinks = [
    {
        title: 'Home',
        href: '/'
    },
    {
        title: 'Pricing',
        href: '/pricing'
    },
    {
        title: 'Contact',
        href: '/contact'
    },
    {
        title: 'About',
        href: '/about'
    }
];

const Navbar = ({ children }) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const { user, status } = useAuth();

    return (
        <>
            <div className="z-50 flex gap-6 lg:gap-10">
                <Logo />
                {navLinks?.length ? (
                    <nav className="hidden gap-6 lg:flex">
                        {navLinks?.map((item, index) => (
                            <Link
                                key={index}
                                href={item.disabled ? "#" : item.href}
                                className={cn(
                                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
                                )}>
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                ) : null}
                {showMobileMenu && navLinks && (
                    <MobileNav items={navLinks}>{children}</MobileNav>
                )}
            </div>
            <nav className="flex items-center gap-3 md:gap-5">
                <ThemeSwitch />
                {
                    status === "loading" ? <Spinner className="!w-6 !h-6" /> : user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="cursor-pointer">
                                    {
                                        status === "loading" ? <Skeleton className="w-10 h-10 rounded-full" /> : (
                                            <Avatar className="rounded-full object-cover w-9 h-9 bg-slate-300 text-white ring-2 ring-violet-600 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:ring-[#00d991]">
                                                <AvatarImage
                                                    src={user?.profilePicture && user?.profilePicture?.url}
                                                    alt={user?.firstName}
                                                />
                                                <AvatarFallback>{user?.firstName.slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                        )
                                    }
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 mt-4">
                                <DropdownMenuItem className="cursor-pointer" asChild>
                                    <Link href="/account">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer" asChild>
                                    <Link href="/account/enrolled-courses">My Courses</Link>
                                </DropdownMenuItem>
                                {
                                    user?.role === "Teacher" && (
                                        <DropdownMenuItem
                                            className="cursor-pointer"
                                            asChild
                                        >
                                            <Link href="/dashboard">Dashboard</Link>
                                        </DropdownMenuItem>
                                    )
                                }
                                <DropdownMenuItem className="cursor-pointer" asChild>
                                    <Link href="/account/enrolled-courses">Testimonials & Certificates</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer" asChild>
                                    <button onClick={() => signOut()} className="w-full">Logout</button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="items-center hidden gap-3 lg:flex">
                            <Link
                                href="/login"
                                className={cn(buttonVariants({ size: "sm" }), "px-4")}>
                                Login
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        Register
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 mt-4">
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Link className="block w-full" href="/register/student">Student</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Link className="block w-full" href="/register/instructor">Instructor</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )
                }

                <button
                    className="flex items-center space-x-2 lg:hidden"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}>
                    {showMobileMenu ? <X /> : <Menu />}
                </button>
            </nav>
        </>
    );
};

export default Navbar;