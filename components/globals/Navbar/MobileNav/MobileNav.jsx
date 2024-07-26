import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLockBody } from "@/hooks/use-lock-body";
import { buttonVariants } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

export function MobileNav({ items, children }) {
    const { user, status } = useAuth();
    useLockBody();

    return (
        <div
            className={cn(
                "fixed inset-0 top-16 z-30 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 lg:hidden"
            )}
        >
            <div className="relative z-20 grid gap-6 p-4 border rounded-md shadow-md bg-popover text-popover-foreground">
                <nav className="grid grid-flow-row text-sm auto-rows-max">
                    {items.map((item, index) => (
                        <Link
                            key={index}
                            href={item.disabled ? "#" : item.href}
                            className={cn(
                                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                                item.disabled && "cursor-not-allowed opacity-60"
                            )}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>
                {
                    status === "loading" ? "Loading..." : !user && <div className="flex items-center gap-3 lg:hidden">
                        <Link
                            href="/login"
                            className={cn(buttonVariants({ size: "sm" }), "px-4")}
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                        >
                            Register
                        </Link>
                    </div>
                }
                {children}
            </div>
        </div>
    );
}
