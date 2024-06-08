import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/brind-logo.png";

const Logo = () => {
    return (
        <>
            <Link className="block max-w-12 max-h-[2.9rem]" href="/">
                <Image className="w-full h-full" width={50} height={50} src={logo} priority alt="Logo" />
            </Link>
        </>
    );
};

export default Logo;