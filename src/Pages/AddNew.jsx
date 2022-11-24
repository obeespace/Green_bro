import React from 'react'
import {AiOutlineCloudUpload} from "react-icons/ai"
import {FaLeaf} from "react-icons/fa"
import {motion} from "framer-motion"
import {getAll, saveNew} from "../utils/firebaseFunctions"
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import {storage} from "../firebase.config"
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const AddNew = () => {

  const [title, setTitle] = React.useState()
  const [category, setCategory] = React.useState()
  const [loading, isLoading] = React.useState(false)
  const [image, setImage] = React.useState(null)
  const [name, setName] = React.useState()
  const [price, setPrice] = React.useState()
  const [field, setField] = React.useState(false)
  const [message, setMessage] = React.useState()
  const [alert, setAlert] = React.useState("danger")
  const [dispatch] = useStateValue()


  const uploadImage = (e) => {
    isLoading(true)
    const imageFile = e.target.files[0]
    const storehold = ref(storage, `Images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storehold, imageFile);
    uploadTask.on("changedState", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

    }, (error) => {
      console.log(error)
      setField(true)
      setMessage("Error Occurred, try again")
      setAlert("danger")
      setTimeout(()=>{
        setField(false)
        isLoading(false)
      }, 3000)
    }, ()=> {
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        setImage(downloadURL)
        isLoading(false)
        setField(true)
        setMessage("success")
        setAlert("success")
        setTimeout(()=>{
          setField(false)
        }, 3000)
      })
    })
    fetchData()
  }
    

  const addLeaf = () => {
    isLoading(true)
    try{
      if(!title || !name || !price ||!image || !category) {
        setField(true)
        setMessage("Dude! Fill Properly")
        setAlert("danger")
        setTimeout(()=>{
          setField(false)
          isLoading(false)
        }, 3000)
      } else {
        const data = {
          id: `${Date.now()}`,
          title : title,
          imageURL : image,
          category : category,
          price : price,
          name : name
        }
        saveNew(data)
        isLoading(false)
        setField(true)
        clearData()
        setMessage("Added To Database")
        setAlert("success")
        setTimeout(() => {
          setField(false) 
        }, 6000);
      }
    } catch (error){
      console.log(error)
      setField(true)
      setMessage("Error Occurred, try again")
      setAlert("danger")
      setTimeout(()=>{
        setField(false)
        isLoading(false)
      }, 3000)
  }
  fetchData()
}

  const deleteImg = () => {
    isLoading(true)
    const deleteTask = ref(storage, image)
    deleteObject(deleteTask).then(()=>{
      setImage(null)
      isLoading(false)
      setField(true)
      setAlert("danger")
      setMessage("Trashed")
      setTimeout(()=>{
        setField(false)
      }, 3000)
    })
  }

  const fetchData = async ()=> {
    await getAll().then((data) => {
      dispatch ({
        type: actionType.SET_ITEMS,
        items : data
      })
    })
  }

  const categories = [
    {
      id:1,
      name: "Leafy Vegetables"
    },
    {
      id:2,
      name: "Fruits"
    },
    {
      id:3,
      name: "Nuts"
    },
    {
      id:4,
      name: "Root Veges"
    }
  ]

  const clearData = () => {
    setTitle("")
    setImage(null)
    setName("")
    setPrice("")
    setCategory("Select Strand")
  }

  return (
    <div className='w-5/6 mx-auto my-10'>
      <div className='mx-auto my-10 w-3/6 justify-center flex items-center gap-3'>
        <p className='font-bold text-lg text-green-800'>New Vegetable</p>
        <FaLeaf />
      </div>
      

      <div className='flex flex-col mx-auto lg:w-4/6 gap-10'>
        {field && (
          <motion.p 
          initial = {{opacity:0}}
          animate = {{opacity:1}}
          exit = {{opacity:0}}
          className={`text-center text-lg font-semibold py-1 rounded-md ${
            alert === "danger" ? "bg-red-400" : "bg-emerald-400"
          }`}>{message}</motion.p>
        )}

        <div className='flex flex-col'>
          {/* <GiChestnutLeaf /> */}
          <div className="border-b-2 border-green-700 rounded-md flex gap-2 items-center px-2 py-2">
            <FaLeaf />
            <input type="text" required value={title} 
            placeholder="Add a title" 
            onChange={(e) => setTitle(e.target.value)}
            className='w-full rounded-md placeholder:text-gray-400 outline-none' />
          </div>

          <div className='border-b-2 mt-5 border-green-700 rounded-md flex gap-2 items-center px-2 py-2'>
            <FaLeaf />
            <select className="w-full rounded-md placeholder:text-gray-400 outline-none" onChange={(e) => setCategory(e.target.value)}>
              <option value = {category}>Select Category</option>
              {categories.map((data) => (
                <option key={data.id} value={data.name}>{data.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="border-2 border-green-700 h-56 rounded-lg mt-5 flex justify-center items-center">
          {loading ? "loading..." : 
          <div>{!image ? 
            <div>
              <label className='flex flex-col justify-center items-center cursor-pointer'>
                <AiOutlineCloudUpload className='text-3xl'/>
                <p>Click to upload</p>
                <input type="file" accept="image/*" name="uploadimage" 
                onChange={uploadImage} className="w-0 h-0"/>
              </label>
            </div> : 
            <div className='relative flex gap-8 items-center'>
              <img src={image} alt="uploaded" className="h-48 relative object cover"/>
              <div><button type="button" onClick={deleteImg} className='bottom-3 bg-green-800 rounded-md px-4 py-2 mt-5 text-white hover:bg-green-700 ease-in-out transition-all cursor-pointer'>Delete Image</button></div>
            </div>}
          </div>}
        </div>

        <div className='lg:flex gap-8'>
          <div className='lg:w-3/6 border-b-2 border-green-700 rounded-md flex gap-2 items-center px-2 py-2'>
          <FaLeaf />
            <input type="text" required value={name} 
              placeholder="Add Leaf Name" 
              onChange={(e) => setName(e.target.value)}
              className='w-full rounded-md placeholder:text-gray-400 outline-none' />
          </div>

          <div className='lg:w-3/6 mt-5 lg:mt-0 border-b-2 border-green-700 rounded-md flex gap-2 items-center px-2 py-2'>
            <FaLeaf />
            <input type="text" required value={price} 
              placeholder="Add Leaf Price" 
              onChange={(e) => setPrice(e.target.value)}
              className='w-full rounded-md placeholder:text-gray-400 outline-none' />
          </div>
        </div>
        <div className='text-right'><button onClick={addLeaf} className='px-4 py-2 bg-green-800 rounded-md px-4 py-2 mt-5 text-white hover:bg-green-700 transition-all ease-in-out'>Roll Out</button></div>
      </div>
    </div>
  )
}

export default AddNew