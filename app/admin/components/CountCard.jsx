"use client"

import useCollectionCount from "@/lib/firebase/count"

export default function CountCard({ path, name, icon }){
    const { data, error, isLoading } = useCollectionCount({ path })
    if(isLoading) {
       return <h1>Loading...</h1>
    }
    if(error){
       return <p>{error}</p>
    }
    return <div className="flex gap-2 bg-gray-50 items-center rounded px-8 py-2">
        {icon}
        <div>
            <h1 className="font-bold">{name}</h1>
            <h2 className="text-xl font-bold">{data}</h2>
        </div>
    </div>
}