import { PostCard } from "@/app/components/PostListView";
import { getCategory } from "@/lib/firebase/categories/read_server";
import { getAllPostsWithCategory } from "@/lib/firebase/posts/read_server";

export async function generateMetadata({ params }) {
    const {categoryId} = params
    const category = await getCategory(categoryId)
      
    return {
      title: category?.name,
      openGraph: {
        images: [category?.imageURL],
      },
    }
}

export default async function Page({ params }) {
    const { categoryId } = params
    const posts = await getAllPostsWithCategory(categoryId)
    return <main className="p-10">
        <div className="flex gap-2 p-5">
            <h1 className="font-bold">Categories /</h1>
            <CategoryCard categoryId={categoryId}/>
        </div>
        <div className="grid grid-cols-4 gap-5">
            {posts?.map((post, key) => {
                return <PostCard post={post} key={key} />
            })}
        </div>
    </main>
}

async function CategoryCard ({categoryId}){
    const category = await getCategory(categoryId)
    return <div className="flex gap-2 items-center bg-white bg-opacity-60 rounded-full px-2 py-1 border">
        <img className="h-4 w-4 rounded-full object-cover" src={category?.iconURL} alt="" />
        <h4 className="text-xs text-gray-500">{category?.name}</h4>
    </div>
}



