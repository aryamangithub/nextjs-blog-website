import { getDocs, collection, getDoc, doc, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"

export const getAllPosts = async() => {
    return await getDocs(collection(db, 'posts')).then((snaps) => snaps.docs.map((d) => d.data()))
}

export const getPost = async(id) => {
    return await getDoc(doc(db, `posts/${id}`)).then((snap) => snap.data())
}

export const getAllPostsWithCategory = async (categoryId) => {
    const q = query(collection(db, "posts"), where("categoryId", "==", categoryId));
    return await getDocs(q).then((snaps) => snaps.docs.map((d) => d.data()))
}