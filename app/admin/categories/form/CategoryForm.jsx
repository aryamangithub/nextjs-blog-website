"use client"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useCategoryForm } from "./contexts/CategoryFormContext"

export default function Page(){
    const searchParams = useSearchParams()
    const updateCategoryId = searchParams.get('id')
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
    } = useCategoryForm()
    
    useEffect(() => {
      if(updateCategoryId){
        fetchData(updateCategoryId)
      }
    }, [updateCategoryId])

    const isLoadingStyle = "bg-gray-500 hover:bg-gray-600"
    const createStyle = "bg-green-500 hover:bg-green-600"
    const deleteStyle = "bg-red-500 hover:bg-red-600"
    const updateStyle = "bg-blue-500 hover:bg-blue-600"
    
    return(
        <main className="w-full flex flex-col gap-3 p-6">
            <div className="flex gap-6">
                {updateCategoryId && 
                    <div>
                        <h3 className="font-semibold text-blue-500">Update</h3>
                    </div>
                }
                <h1 className="font-bold">Categories | Form</h1>
            </div>
            <section className="flex">
                <form 
                    className="flex flex-col gap-2 border shadow-sm rounded-xl p-7"
                    onSubmit={(e)=>{
                        e.preventDefault()
                        if(updateCategoryId){
                            handleUpdate()
                        } else{
                            handleCreate()
                        }
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-black">Category Name <span className="text-red-500">*</span></label>
                        <input
                            className="px-4 py-2 rounded-lg border" 
                            placeholder="Enter Category Name"
                            type="text" 
                            onChange={(e) => {
                                handleData('name', e.target.value)
                            }}
                            value={data?.name}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-mediumtext-black">Category Slug <span className="text-red-500">*</span></label>
                        <input
                            className="px-4 py-2 rounded-lg border" 
                            placeholder="Enter Category Slug"
                            type="text" 
                            onChange={(e) => {
                                handleData('slug', e.target.value)
                            }}
                            value={data?.slug}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-black">Category Description <span className="text-red-500">*</span></label>
                        <input
                            className="px-4 py-2 rounded-lg border" 
                            placeholder="Enter Category Decription"
                            type="text" 
                            onChange={(e) => {
                                handleData('description', e.target.value)
                            }}
                            value={data?.description}
                            required
                        />
                    </div>
                    <div className="flex">
                        {data?.iconURL && <div>
                                <img className="h-32"src={data?.iconURL} alt="" />
                            </div>}
                        {image && <div>
                            <img className="h-32"src={URL.createObjectURL(image)} alt="" />
                        </div>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-black">Image</label>
                        <input
                            className="px-4 py-2 rounded-lg border" 
                            placeholder="Enter Category Decription"
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
                            className= {`${isLoading ? isLoadingStyle : updateCategoryId ? updateStyle : createStyle} rounded-lg px-4 py-2 text-white`}>
                            {isLoading ? "Loading..." : updateCategoryId ? "Update" : "Create"}
                        </button>
                    }

                    {updateCategoryId && !isDone && 
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                handleDelete(updateCategoryId)
                            }} 
                            disabled={isLoading || isDone}
                            className={`${isLoading ? isLoadingStyle : deleteStyle} rounded-lg px-4 py-2 text-white`}>
                            {isLoading ? "Loading..." : "Delete"}
                        </button>
                    }

                    {isDone && 
                        <h3 className="text-green-500 text-center">
                            Successfully { updateCategoryId ? "Updated" : "Created" }!
                        </h3>
                    }
                </form>
            </section>
        </main>
    )
}