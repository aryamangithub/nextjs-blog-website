import { getAllCategories } from "@/lib/firebase/categories/read_server"
import Link from "next/link"

export async function generateMetadata({ params }) {
    return {
      title: "Categories",
    }
}

export default async function Page(){
    const categories = await getAllCategories()
    return <main className="p-10">
        <section className="grid grid-cols-6">
            {categories.map((category, key) => {
                return <div>
                    <CategoryCard category={category} key={key} />
                </div>
            })}
        </section>
    </main>
}

function CategoryCard({ category }){
    return <Link href={`categories/${category?.id}`}>
        <div className="flex flex-col items-center justify-center gap-2 hover:bg-slate-100 rounded-xl p-4">
            <img className="h-28 w-28 object-cover rounded-full" src={category?.iconURL} alt="" />
            <h1 className="font-bold">{category?.name}</h1>
        </div>
    </Link>
}