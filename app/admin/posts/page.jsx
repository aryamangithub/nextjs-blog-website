import { CirclePlus } from "lucide-react";
import Link from "next/link";
import PostListView from "./components/PostListView";

export default function Page(){
    return(
        <main className="p-6 w-full flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="font-bold">Posts</h1>
                <Link href="/admin/posts/form">
                    <button className="flex gap-2 items-center bg-black px-4 py-2 text-white rounded-full font-bold hover:bg-slate-900">
                        <CirclePlus className="size-4"/> 
                        Create
                    </button>
                </Link>
            </div>
            <PostListView />
        </main>
    )
}