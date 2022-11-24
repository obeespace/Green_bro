import React, { useState } from 'react'
import {BsFillCartFill} from "react-icons/bs"
import {HiOutlineViewGridAdd} from "react-icons/hi"
import {AiOutlineHome} from "react-icons/ai"
import {BiLogOut} from "react-icons/bi"
import headerImg from "../img/avater.jpg"
import {motion} from "framer-motion"
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { app } from '../firebase.config'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import "../CSS/header.css"


const Header = () => {

  const firebaseauth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const [isMenu, setisMenu] = useState(false)

  const [{user}, dispatch] = useStateValue()

  const navigate = useNavigate()

  const login = async() => {
    if (!user) {
      const {user: {refreshToken, providerData}} = await signInWithPopup(firebaseauth, provider)
      dispatch ({
        type: actionType.SET_USER,
        user: providerData[0]
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]))
    } else {
       setisMenu(!isMenu)
    }
  }

  const logOut = () => {
    localStorage.clear()
    dispatch({
      type : actionType.SET_USER,
      user : null
    })
  }

  function closeMenu (){
    setisMenu(false)
  }

  return (
    <div className=''>
      <div className="lg:flex hidden justify-between w-5/6 mx-auto sticky bg-white items-center">
        <Link to="/"><div className='py-5 font-semibold text-xl text-green-700'>Green Bro</div></Link>
        <div className='flex gap-4 items-center'>
          <div className='relative duration-300 transition-all ease-in-out hover:text-green-700 cursor-pointer hover:text-lg'>
            <BsFillCartFill className=''/>
            <div className='text-sm absolute -top-3.5 -right-0 text-red-500 font-bolder'>3</div>
          </div>
          <div className='relative'>
            <motion.img whileTap={{scale:0.6}} src={user ? user.photoURL : headerImg} alt='avatar' className='h-10 cursor-pointer rounded-full' onClick={login}/>
            {isMenu && 
              <motion.div 
              initial={{opacity : 0, scale : 0.6}} 
              animate={{opacity : 1, scale : 1}}
              exit={{opacity : 0, scale : 0.6}}
              className='w-max bg-primary shadow-xl rounded-lg flex flex-col absolute px-2 py-2 top-12 right-0'>
                {user && user.email === "obeewon20@gmail.com" && <Link to="/new-item" onClick={closeMenu}><p className='px-4 py-2 rounded-lg flex flex-row items-center gap-4 hover:bg-green-700 hover:text-white transition-all duration-100 ease-in-out text-green-700 text-base cursor-pointer'>New Item <HiOutlineViewGridAdd/></p></Link>}
                <p onClick={()=> {logOut(); closeMenu(); navigate("/")}} className='mx-auto px-4 mt-2 py-2 rounded-lg flex flex-row items-center gap-4 bg-green-800 hover:bg-green-600 hover:text-white transition-all duration-100 ease-in-out text-white text-base cursor-pointer'>Log Out <BiLogOut/></p>
              </motion.div>
            }
            
          </div>
        </div>
      </div>

      {/* mobile view*/}
      <div className='flex justify-between sticky bg-white z-50 lg:hidden items-center mx-auto w-5/6'>
        <Link to="/"><div className=' py-5  z-50 font-semibold text-xl text-green-700'>Green Bro</div></Link>
        <div className = "flex items-center gap-5">
          <div className='relative duration-300 transition-all ease-in-out hover:text-green-700 cursor-pointer hover:text-lg'>
            <BsFillCartFill className=''/>
            <div className='text-sm absolute -top-3.5 -right-0 text-red-500 font-bolder'>3</div>
          </div>
          <div className='relative '>
            <motion.img whileTap={{scale:0.6}} src={user ? user.photoURL : headerImg} alt='avatar' className='h-10 cursor-pointer rounded-full' onClick={login}/>
            {isMenu && 
              <motion.div 
              initial={{opacity : 0, scale : 0.6}} 
              animate={{opacity : 1, scale : 1}}
              exit={{opacity : 0, scale : 0.6}}
              className='w-max bg-white shadow-xl rounded-lg text-green-800 flex flex-col absolute px-2 py-2 top-12 right-0'>
                <Link onClick={closeMenu} to="/"><p className='px-4 py-2 rounded-lg flex flex-row items-center gap-4 hover:bg-green-700 hover:text-white transition-all duration-100 ease-in-out text-green-700 text-base cursor-pointer'>Home <AiOutlineHome/></p></Link>
                {user && user.email === "obeewon20@gmail.com" && <Link to="/new-item" onClick={closeMenu}><p className='px-4 py-2 rounded-lg flex flex-row items-center gap-4 hover:bg-green-800 hover:bg-green-700 hover:text-white transition-all duration-100 ease-in-out text-green-700 text-base cursor-pointer'>New Item <HiOutlineViewGridAdd/></p></Link>}
                <p onClick={()=> {logOut(); closeMenu(); navigate("/")}} className='mx-auto px-4 mt-2 py-2 rounded-lg flex flex-row items-center gap-4 bg-green-800 hover:bg-green-600 hover:text-white transition-all duration-100 ease-in-out text-white text-base cursor-pointer'>Log Out <BiLogOut/></p>
              </motion.div>
            }
            
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Header