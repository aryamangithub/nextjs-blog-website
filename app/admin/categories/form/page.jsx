"use client"

import { useCategoryForm } from "./contexts/CategoryFormContext"

export default function Page(){
    const {
        data,
        isLoading,
        error,
        isDone,
        image,
        setImage,
        handleData,
        handleCreate,
    } = useCategoryForm()

    return(
        <main className="w-full flex flex-col gap-3 p-6">
            <h1 className="font-bold">Categories | Form</h1>
            <section className="flex">
                <form 
                    className="flex flex-col gap-2 border shadow-sm rounded-xl p-7"
                    onSubmit={(e)=>{
                        e.preventDefault()
                        handleCreate()
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
                    {image && <div>
                            <img className="h-40"src={URL.createObjectURL(image)} alt="" />
                        </div>}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-black">Image <span className="text-red-500">*</span></label>
                        <input
                            className="px-4 py-2 rounded-lg border" 
                            placeholder="Enter Category Decription"
                            type="file"
                            accept="image/*" 
                            onChange={(e)=>{
                                e.preventDefault()
                                setImage(e.target.files[0])
                            }}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {!isDone && <button
                        type="submit" 
                        disabled={isLoading || isDone}
                        className="bg-black rounded-lg px-4 py-2 text-white">
                        {isLoading ? "Loading..." : "Create"}
                    </button>}
                    {isDone && <h3 className="text-green-500 text-center">Successfully created!</h3>}
                </form>
            </section>
        </main>
    )
}