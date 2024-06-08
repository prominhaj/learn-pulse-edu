import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/brind-logo.png";

const Logo = () => {
    return (
        <>
            <Link className="block max-w-14 max-h-[3.2rem]" href="/">
                <Image className="w-full h-full" width={70} height={60} src={logo} priority alt="Logo" />
            </Link>
        </>
    );
};

export default Logo;