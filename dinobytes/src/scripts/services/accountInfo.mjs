import { addDoc, collection, getDocs, setDoc, doc, getDoc } from "firebase/firestore"; 
import { getDb } from "./db.mjs"

const collection_name = "accountInfo"

export const create = args => addDoc(collection(getDb(), collection_name), args)

export const findAll = async () => {
    const doc_refs = await getDocs(collection(getDb(), collection_name))

    const res = []

    doc_refs.forEach(accountInfo => {
        res.push({
            id: accountInfo.id, 
            ...accountInfo.data()
        })
    })

    return res
}

export const update = args => {
    const {id, ...params} = args 
    return setDoc(doc(getDb(), collection_name, id), params)
}

export const findOne = async id => {
    const d = await getDoc(doc(getDb(), collection_name, id)) 
    return d.data()
}