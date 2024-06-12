"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
	{ label: "Profile", href: "/account" },
	{ label: "Enrolled Courses", href: "/account/enrolled-courses" },
];

function Menu() {
	const pathname = usePathname();
	return (
		<ul className="mt-3 mb-0 list-none sidebar-nav" id="navmenu-nav">
			{menu.map((item, i) => (
				<li className="navbar-item account-menu" key={i}>
					<Link
						href={item.href}
						className={`navbar-link flex items-center py-2 rounded ${pathname === item.href ? "text-primary" : "text-slate-400"
							}`}>
						<h6 className="mb-0 font-semibold">{item?.label}</h6>
					</Link>
				</li>
			))}
			<li className="navbar-item account-menu">
				<Link
					href="#"
					className="flex items-center py-2 rounded navbar-link text-slate-400">
					<h6 className="mb-0 font-semibold">Sign Out</h6>
				</Link>
			</li>
		</ul>
	);
}

export default Menu;
