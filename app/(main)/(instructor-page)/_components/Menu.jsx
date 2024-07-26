"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = ({ menu }) => {
    const pathname = usePathname();

    return (
        <div>
            <ul className='mt-3 mb-0 list-none sidebar-nav'>
                {menu.map((item, i) => (
                    <li className='navbar-item account-menu' key={i}>
                        <Link
                            href={item.href}
                            className={`font-medium font-inter flex items-center py-1 rounded 
                                ${pathname === item.href ? "text-primary" : "text-muted-foreground"}`
                            }
                        >
                            {item?.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Menu;