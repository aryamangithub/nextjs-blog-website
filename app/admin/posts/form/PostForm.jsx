"use client"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { usePostForm } from "./contexts/PostFormContext"
import { useCategories } from "@/lib/firebase/categories/read"
import { useAuthors } from "@/lib/firebase/author/read"
import RTEField from "./components/RTEField"

export default function Page(){
    const searchParams = useSearchParams()
    const updatePostId = searchParams.get('id')
    const {
        data,
        isLoading,
        error,
        isDone,
        handleData,
        handleCreate,
        handleUpdate,
        handleDelete,
        image,
        setImage,
        fetchData,
    } = usePostForm()
    
    useEffect(() => {
      if(updatePostId){
        fetchData(updatePostId)
      }
    }, [updatePostId])

    const isLoadingStyle = "bg-gray-500 hover:bg-gray-600"
    const createStyle = "bg-green-500 hover:bg-green-600"
    const deleteStyle = "bg-red-500 hover:bg-red-600"
    const updateStyle = "bg-blue-500 hover:bg-blue-600"
    
    return(
        <main className="w-full flex flex-col gap-3 p-6">
            <div className="flex gap-6">
                {updatePostId && 
                    <div>
                        <h3 className="font-semibold text-blue-500">Update</h3>
                    </div>
                }
                <h1 className="font-bold">Posts | Form</h1>
            </div>
            <section className="flex">
                <form 
                    className="flex flex-col gap-2 border shadow-sm rounded-xl p-7"
                    onSubmit={(e)=>{
                        e.preventDefault()
                        if(updatePostId){
                            handleUpdate()
                        } else{
                            handleCreate()
                        }
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-black">Title <span className="text-red-500">*</span></label>
                        <input
                            className="px-4 py-2 rounded-lg border" 
                            placeholder="Enter Title"
                            type="text" 
                            onChange={(e) => {
                                handleData('title', e.target.value)
                            }}
                            value={data?.title}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-mediumtext-black">Post Slug <span className="text-red-500">*</span></label>
                        <input
                            className="px-4 py-2 rounded-lg border" 
                            placeholder="Enter Post Slug"
                            type="text" 
                            disabled={updatePostId}
                            onChange={(e) => {
                                handleData('slug', e.target.value)
                            }}
                            value={data?.slug}
                            required
                        />
                    </div>

                    <SelectCategoryField />
                    <SelectAuthorField />
                    {/* <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-black">Post Description <span className="text-red-500">*</span></label>
                        <input
                            className="px-4 py-2 rounded-lg border" 
                            placeholder="Enter Post Decription"
                            type="text" 
                            onChange={(e) => {
                                handleData('description', e.target.value)
                            }}
                            value={data?.description}
                            required
                        />
                    </div> */}
                    <div className="flex">
                        {data?.imageURL && <div>
                                <img className="h-32"src={data?.imageURL} alt="" />
                            </div>}
                        {image && <div>
                            <img className="h-32"src={URL.createObjectURL(image)} alt="" />
                        </div>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-black">Image</label>
                        <input
                            className="px-4 py-2 rounded-lg border" 
                            placeholder="Enter Post Decription"
                            type="file"
                            accept="image/*" 
                            onChange={(e)=>{
                                e.preventDefault()
                                setImage(e.target.files[0])
                            }}
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    
                    {!isDone && 
                        <button
                            type="submit" 
                            disabled={isLoading || isDone}
                            className= {`${isLoading ? isLoadingStyle : updatePostId ? updateStyle : createStyle} rounded-lg px-4 py-2 text-white`}>
                            {isLoading ? "Loading..." : updatePostId ? "Update" : "Create"}
                        </button>
                    }

                    {updatePostId && !isDone && 
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                handleDelete(updatePostId)
                            }} 
                            disabled={isLoading || isDone}
                            className={`${isLoading ? isLoadingStyle : deleteStyle} rounded-lg px-4 py-2 text-white`}>
                            {isLoading ? "Loading..." : "Delete"}
                        </button>
                    }

                    {isDone && 
                        <h3 className="text-green-500 text-center">
                            Successfully { updatePostId ? "Updated" : "Created" }!
                        </h3>
                    }
                </form>
                <RTEField />
            </section>
        </main>
    )
}

function SelectCategoryField(){
    const { data : categories } = useCategories()
    const {
        data,
        handleData,
    } = usePostForm()
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-black">Category <span className="text-red-500">*</span></label>
            <select
                className="px-4 py-2 rounded-lg border" 
                name="category" 
                id="category"
                value={data?.categoryId}
                onChange={(e) => {
                    handleData('categoryId', e.target.value)
                }}
                required
            >
                <option value="">Select Category</option>
                {categories && categories?.map((item) => {
                    return <option key={item?.id} value={item?.id}>{item?.name}</option>
                })}
            </select>
        </div>
    )
}

function SelectAuthorField(){
    const { data : authors } = useAuthors()
    const {
        data,
        handleData,
    } = usePostForm()
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-black">Authors <span className="text-red-500">*</span></label>
            <select
                className="px-4 py-2 rounded-lg border" 
                name="author" 
                id="author"
                value={data?.authorId}
                onChange={(e) => {
                    handleData('authorId', e.target.value)
                }}
                required
            >
                <option value="">Select Author</option>
                {authors && authors?.map((item) => {
                    return <option key={item?.id} value={item?.id}>{item?.name}</option>
                })}
            </select>
        </div>
    )
}