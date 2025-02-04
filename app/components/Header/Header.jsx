import { ArrowRight, Home, List, MessageCircle, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Login from "@/app/components/Auth/Login"

export default function Header() {
    return(
        <nav className="flex justify-between items-center px-7 py-3 border-b">
            <Link href="/">
                <div className="flex gap-1 items-center justify-center">
                    <div className="shadow-sm p-1 rounded-md w-10 h-10 inline-flex items-center justify-center">
                        <Image src="/pencil.png" alt="logo" width={100} height={100} className="drop-shadow-lg" />
                    </div>
                    <h1 className="text-xl font-semibold">postit.</h1>
                </div>
            </Link>
            <ul className="flex gap-6 items-center text-sm font-medium">
                <li className="flex items-center gap-2">
                    <Home/>
                    Home
                </li>
                <li className="flex items-center gap-2">
                    <List/>
                    Blog
                </li>
                <li className="flex items-center gap-2">
                    <MessageCircle/>
                    Contact
                </li>
            </ul>
            <div className="flex gap-3">
                <Login/>
                <button className="flex items-center justify-center bg-black text-white h-10 px-4 py-2 rounded-md text-sm font-medium hover:bg-black/90 ">
                    Get Started <ArrowRight/>
                </button>
            </div>
        </nav>
    )
}
