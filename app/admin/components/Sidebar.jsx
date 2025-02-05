import { Gauge, Layers3, LayoutList, User2 } from "lucide-react"
import Link from "next/link"

export default function Sidebar(){
    const link = [
        {
            name: 'Dashboard',
            link: '/admin',
            icon: <Gauge />
        },
        {
            name: 'Posts',
            link: '/admin/posts',
            icon: <LayoutList />
        },
        {
            name: 'Category',
            link: '/admin/categories',
            icon: <Layers3 />
        },
        {
            name: 'Authors',
            link: '/admin/authors',
            icon: <User2 />
        },
    ]
    return(
        <section className="w-[200px] border-r h-screen p-6">
            <ul className="w-full flex flex-col gap-6">
                {link.map((item, index)=>{
                    return( 
                        <Link href={item.link} key={index}>    
                            <li className="flex gap-3 items-center bg-slate-100 rounded-full px-5 py-2 font-medium text-sm" > 
                                {item.icon}
                                <span className="">{item.name}</span>       
                            </li>
                        </Link>
                )})}
            </ul>
        </section>
    )
}