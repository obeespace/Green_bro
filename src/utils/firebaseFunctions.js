import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore"
import { firestore } from "../firebase.config"

// save new item
export const saveNew = async(data) => {
    await setDoc(doc(firestore, "foodaffairs", `${Date.now()}` ), data, {
        merge: true,
    })
}

// get all items
export const getAll = async() =>{
    const items = await getDocs(
        query(collection(firestore, "foodaffairs"), orderBy("id", "desc"))
    )

    return items.docs.map((doc)=> doc.data())
}