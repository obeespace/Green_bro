import React from 'react'
import {BsFillCartFill} from "react-icons/bs"
import {motion} from "framer-motion"
import Spinach from "../img/spinach.png"

const VegetableRow = (data) => {
  console.log(data)
  return (
    <motion.div
      initial={{opacity : 0, x :-200}} 
      animate={{opacity : 1, x : 0}} 
      exit={{opacity : 0, x :-200}}
    >
      <div className='shadow-lg rounded-lg px-4 py-5 h-56 hover:bg-gray-50 w-60 min-w-[250px]'>
        <div className="flex items-center gap-10">
            <motion.img alt='veges' src={data.imageURL} whileHover={{scale:1.2}} className='rounded-2xl h-28 w-28 bg-gray-600' />
            <motion.div whileTap={{scale: 0.7}} className="rounded-full bg-green-700 cursor-pointer shadow-md h-10 w-10 flex justify-center items-center"><BsFillCartFill className="text-white" /></motion.div>
        </div>
        
        <div className='text-right'>
            <p className='font-bold'>{data.name}</p>
            <p className='text-gray-400'>{data.category}</p>
            <p className='font-bold'><span className='text-green-700'>N</span>{data.price}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default VegetableRow