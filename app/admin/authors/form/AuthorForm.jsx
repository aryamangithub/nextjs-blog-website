"use client"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useAuthorForm } from "./contexts/AuthorFormContext"

export default function Page(){
    const searchParams = useSearchParams()
    const updateAuthorId = searchParams.get('id')
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
    } = useAuthorForm()
    
    useEffect(() => {
      if(updateAuthorId){
        fetchData(updateAuthorId)
      }
    }, [updateAuthorId])

    const isLoadingStyle = "bg-gray-500 hover:bg-gray-600"
    const createStyle = "bg-green-500 hover:bg-green-600"
    const deleteStyle = "bg-red-500 hover:bg-red-600"
    const updateStyle = "bg-blue-500 hover:bg-blue-600"
    
    return(
        <main className="w-full flex flex-col gap-3 p-6">
            <div className="flex gap-6">
                {updateAuthorId && 
                    <div>
                        <h3 className="font-semibold text-blue-500">Update</h3>
                    </div>
                }
                <h1 className="font-bold">Authors | Form</h1>
            </div>
            <section className="flex">
                <form 
                    className="flex flex-col gap-2 border shadow-sm rounded-xl p-7"
                    onSubmit={(e)=>{
                        e.preventDefault()
                        if(updateAuthorId){
                            handleUpdate()
                        } else{
                            handleCreate()
                        }
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-black">Author Name <span className="text-red-500">*</span></label>
                        <input
                            className="px-4 py-2 rounded-lg border" 
                            placeholder="Enter Author Name"
                            type="text" 
                            onChange={(e) => {
                                handleData('name', e.target.value)
                            }}
                            value={data?.name}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-mediumtext-black">Author Email <span className="text-red-500">*</span></label>
                        <input
                            className="px-4 py-2 rounded-lg border" 
                            placeholder="Enter Author Email"
                            type="email" 
                            onChange={(e) => {
                                handleData('email', e.target.value)
                            }}
                            value={data?.email}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-black">Author Mobile Number <span className="text-red-500">*</span></label>
                        <input
                            className="px-4 py-2 rounded-lg border" 
                            placeholder="00000 00000"
                            type="tel" 
                            pattern="[0-9]{5} [0-9]{5}"
                            onChange={(e) => {
                                handleData('mobileno', e.target.value)
                            }}
                            value={data?.mobileno}
                            required
                        />
                    </div>
                    <div className="flex">
                        {data?.photoURL && <div>
                                <img className="h-32"src={data?.photoURL} alt="" />
                            </div>}
                        {image && <div>
                            <img className="h-32"src={URL.createObjectURL(image)} alt="" />
                        </div>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-black">Image</label>
                        <input
                            className="px-4 py-2 rounded-lg border" 
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
                            className= {`${isLoading ? isLoadingStyle : updateAuthorId ? updateStyle : createStyle} rounded-lg px-4 py-2 text-white`}>
                            {isLoading ? "Loading..." : updateAuthorId ? "Update" : "Create"}
                        </button>
                    }

                    {updateAuthorId && !isDone && 
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                handleDelete(updateAuthorId)
                            }} 
                            disabled={isLoading || isDone}
                            className={`${isLoading ? isLoadingStyle : deleteStyle} rounded-lg px-4 py-2 text-white`}>
                            {isLoading ? "Loading..." : "Delete"}
                        </button>
                    }

                    {isDone && 
                        <h3 className="text-green-500 text-center">
                            Successfully { updateAuthorId ? "Updated" : "Created" }!
                        </h3>
                    }
                </form>
            </section>
        </main>
    )
}