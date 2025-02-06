"use client"

import { useAuthors } from "@/lib/firebase/author/read";
import { Pencil } from "lucide-react";
import Link from "next/link";

export default function AuthorsListView() {
    const { data, error, isLoading } = useAuthors()
    if(isLoading){
        return <h1>Loading...</h1>
    }

    if(error){
        return <h1>{error}</h1>
    }

    if(!data){
        return <h1>Data not found!</h1>
    }

    return (
        <section>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="border px-4 py-2 bg-slate-100">Sr.</th>
                        <th className="border px-4 py-2 bg-slate-100">Photo</th>
                        <th className="border px-4 py-2 bg-slate-100">Name</th>
                        <th className="border px-4 py-2 bg-slate-100">Email</th>
                        <th className="border px-4 py-2 bg-slate-100">Mobile Number</th>
                        <th className="border px-4 py-2 bg-slate-100">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => {
                        return (
                            <tr className="font-medium font-sans">
                                <td className="border px-4 py-2">{index+1}</td>
                                <td className="border px-4 py-2"><img className="h-10 w-10" src={item?.photoURL} alt="" /></td>
                                <td className="border px-4 py-2">{item?.name}</td>
                                <td className="border px-4 py-2">{item?.email}</td>
                                <td className="border px-4 py-2">{item?.mobileno}</td>
                                <td className="border px-4 py-2">
                                    <Link href={`/admin/authors/form?id=${item?.id}`}>
                                        <button className="flex items-center text-blue-500 hover:text-blue-600">{<Pencil className="h-4"/>}Edit</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}