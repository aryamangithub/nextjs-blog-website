import { Home, List, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Login from "@/app/components/Auth/Login"
import AuthContextProvider from "@/lib/contexts/AuthContext";

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
                <Link href="/">
                    <li className="flex items-center gap-2">
                        <Home/>
                        Home
                    </li>
                </Link>
                <Link href="/blogs">
                    <li className="flex items-center gap-2">
                        <List/>
                        Blog
                    </li>
                </Link>
                <Link href="/contact">
                    <li className="flex items-center gap-2">
                        <MessageCircle/>
                        Contact
                    </li>
                </Link>
            </ul>

            <AuthContextProvider>
                    <Login/>
            </AuthContextProvider>
        </nav>
    )
}
