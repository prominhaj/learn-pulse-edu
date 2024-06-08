"use client";
import Image from "next/image";
import Link from "next/link";
import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Logo = () => {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-12 h-[2.9rem] bg-gray-200 dark:bg-gray-500 rounded-full animate-pulse" />
        );
    }

    const currentTheme = theme === "system" ? resolvedTheme : theme;
    const logoSrc = currentTheme === "dark" ? logoDark : logoLight;

    return (
        <Link className="block max-w-12 max-h-[2.9rem]" href="/">
            <Image className="w-full h-full" width={50} height={50} src={logoSrc} priority alt="Logo" />
        </Link>
    );
};

export default Logo;
