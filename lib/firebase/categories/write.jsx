//Create new categories

import { db, storage } from "@/lib/firebase"
import { deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export const createNewCategory = async({data, image}) => {
    if(!data?.name){
        throw new Error("Name undefined")
    }
    if(!data?.slug){
        throw new Error("Slug undefined")
    }
    if(!data?.description){
        throw new Error("Decription undefined")
    }
    if(!image){
        throw new Error("Image is not selected")
    }

    const imageRef = ref(storage, `categories/${data?.slug}.png`)
    await uploadBytes(imageRef, image)
    const imageURL = await getDownloadURL(imageRef)

    const firestoreRef = doc(db, `categories/${data?.slug}`)
    await setDoc(firestoreRef, {
        ...data,
        id: data?.slug,
        iconURL: imageURL,
        timestamp: Timestamp.now(),
    })
}

export const updateCategory = async({data, image}) => {
    if(!data?.name){
        throw new Error("Name undefined")
    }
    if(!data?.slug){
        throw new Error("Slug undefined")
    }
    if(!data?.description){
        throw new Error("Decription undefined")
    }

    var imageURL = data?.iconURL
    if(image){
        const imageRef = ref(storage, `categories/${data?.slug}.png`)
        await uploadBytes(imageRef, image)
        imageURL = await getDownloadURL(imageRef)        
    }


    const firestoreRef = doc(db, `categories/${data?.id}`)
    await updateDoc(firestoreRef, {
        ...data,
        iconURL: imageURL,
        timestamp: Timestamp.now(),
    })
}
export const deleteCategory = async(id) => {
    if(!id){
        throw new Error("Id is required")
    }

    await deleteDoc(doc(db, `categories/${id}`))
}