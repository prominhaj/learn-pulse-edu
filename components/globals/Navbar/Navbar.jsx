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

// Nav Items
const navLinks = [
    {
        title: 'Features',
        href: '/#features'
    },
    {
        title: 'Pricing',
        href: '/pricing'
    },
    {
        title: 'Blog',
        href: '/blog'
    },
    {
        title: 'Documentation',
        href: '/docs'
    }
];

const Navbar = ({ children }) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    return (
        <>
            <div className="flex gap-6 lg:gap-10">
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
            <nav className="flex items-center gap-3">
                <ThemeSwitch />
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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer">
                            <Avatar>
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-4">
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href="account">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href="account/enrolled-courses">My Courses</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href="">Testimonials & Certificates</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href="">Logout</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
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