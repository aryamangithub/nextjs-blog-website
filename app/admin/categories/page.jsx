import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default function Page(){
    return(
        <main className="p-6 w-full">
            <div className="flex justify-between items-center">
                <h1 className="font-bold">Categories</h1>
                <Link href="/admin/categories/form">
                    <button className="flex gap-2 items-center bg-black px-4 py-2 text-white rounded-full font-bold">
                        <CirclePlus/> 
                        Add
                    </button>
                </Link>
            </div>
        </main>
    )
}