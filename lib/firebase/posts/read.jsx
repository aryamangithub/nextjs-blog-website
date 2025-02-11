"use client"
import { db } from "@/lib/firebase"
import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore"
import useSWR from "swr"

const fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, "posts"))
    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
}

export function usePosts(){
    const { data, error, mutate } = useSWR("posts", fetchPosts, {

        revalidateOnFocus: true,
        dedupingInterval: 0,
        // const ref = collection(db, path)

        // const unsub = onSnapshot(ref, (snaps) => {
        //     next(null, snaps.docs.map((v) => v.data()))
        // }, (error) => {
        //     next(error?.message)
        // })
        // return () => unsub()
    })

    return  {
        data,
        error,
        isLoading : !data && !error,
        refresh: mutate
    }
}

export const getPost = async(id) => {
    return await getDoc(doc(db, `posts/${id}`))
}