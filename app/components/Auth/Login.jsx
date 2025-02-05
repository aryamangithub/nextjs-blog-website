"use client"

import { useAuth } from "@/lib/contexts/AuthContext"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Login() {
    const {
        user,
        isLoading,
        error,
        handleSignInWithGoogle,
        handleLogout
    } = useAuth()

    if(isLoading){
        return <h1>loading</h1>
    }

    if(user){
        return (
            <div className="flex gap-4 items-center">
                <button 
                    className="flex items-center justify-center bg-black text-white h-10 px-4 py-2 rounded-md text-sm font-medium hover:bg-black/90"
                    onClick={handleLogout}
                >
                    Logout
                </button>
                <Link href="/admin">
                    <div className="flex gap-2 rounded-xl bg-slate-100 px-3 py-2">
                        <img src={user?.photoURL} alt="" className="object-cover h-10 w-10 rounded-full"/>
                        <div>    
                            <h1 className="font-bold">{user?.displayName}</h1>
                            <h1 className="text-sm text-gray-500">{user?.email}</h1>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
    return (
        <section>
            <button 
                className="flex items-center justify-center bg-black text-white h-10 px-4 py-2 rounded-md text-sm font-medium hover:bg-black/90"
                onClick={handleSignInWithGoogle}
            >
                Get Started <ArrowRight/>
            </button>
        </section>
    )
}