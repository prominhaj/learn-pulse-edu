"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
	{ label: "Profile", href: "/account" },
	{ label: "Enrolled Courses", href: "/account/enrolled-courses" },
];

function Menu() {
	const pathname = usePathname();

	return (
		<ul className="mt-3 mb-0 list-none sidebar-nav">
			{menu.map((item, i) => (
				<li className="navbar-item account-menu" key={i}>
					<Link
						href={item.href}
						className={`navbar-link font-medium font-inter flex items-center py-1 rounded ${pathname === item.href ? "text-primary" : "text-muted-foreground"
							}`}>
						{item?.label}
					</Link>
				</li>
			))}
			<li className="mt-2 navbar-item account-menu">
				<Button
					onClick={() => signOut()}
					variant="destructive"
					size="sm"
					className="flex items-center w-full text-sm"
				>
					Logout
				</Button>
			</li>
		</ul>
	);
}

export default Menu;
