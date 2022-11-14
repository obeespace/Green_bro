import React from 'react'
import { useStateValue } from '../context/StateProvider'
import {MdOutlineDirectionsBike} from "react-icons/md"
import homeImg from "../img/mustard.png"
import { filterProps, motion } from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import VegetableRow from '../components/VegetableRow'

const Home = () => {

  const [toggle, setToggle] = React.useState(true)
  const [{items}, dispatch] = useStateValue()
  const vegetableDisplay = items?.filter((n) => n.category === "Leafy Vegetables")
  
  const rootDisplay = items?.filter((n) => n.category === "Root Veges")

  var vegetableDisplayContainer = vegetableDisplay.map(function (item) {
    return <VegetableRow flag={true} key={item.id} {...item} />})

  var rootDisplayContainer = rootDisplay.map(function (item) {
    return <VegetableRow flag={true} key={item.id} {...item} />
  })

  function scroll() {
    setToggle((prev) => !prev)
  }

  const categorie = [
    {
      id: 1,
      name: "Fruits"
    },
    {
      id: 2,
      name: "Nuts"
    },
    {
      id: 3,
      name: "Leafy Green"
    },
    {
      id: 4,
      name: "Roots"
    }
  ]

  function MenuHeaders(props){
    return (
      <motion.div whileTap={{scale: 0.7}} 
        key={props.name}
        className='h-10 hover:bg-green-600 flex justify-center shadow-md cursor-pointer items-center text-white w-max px-3 bg-green-800 rounded-xl '>
        <p className='text-xl'>{props.name}</p>
      </motion.div>
    )
  }

  const hold = categorie.map(function(item){
    return <MenuHeaders key={item.id} {...item}/>
  })

  return (
    <div className = "mx-auto lg:mt-12 mt-8 w-5/6">
    {/* Landing Page */}
      
      <section className='lg:flex gap-20 items-center'>
        <div className='lg:w-5/12'>
          <p className="flex items-center gap-2 bg-yellow-100 w-max text-black rounded-md px-2 py-1">Bike Delivery<span className='rounded-full bg-white shadow-xl w-6 h-6 flex items-center justify-center'> <MdOutlineDirectionsBike className="drop-shadow-xl"/></span></p>
          <p className="text-5xl font-black ">Be one with nature in its <span className ="text-green-700">Glories</span></p>
          <p className='mt-5'><span className='italic text-gray-700'>“We don't need a melting pot in this country, 
          folks. We need a salad bowl. In a salad bowl, you put in the different
           things. You want the vegetables - the lettuce, the cucumbers, 
           the onions, the green peppers - to maintain their identity. 
           You appreciate differences.”</span> — Jane Elliot</p>
          <button className='bg-green-800 rounded-md px-4 py-2 mt-5 text-white hover:bg-green-600'>Re-up Now</button>
        </div>
        <img src={homeImg} alt ="vegetables" className='text-center mt-14 lg:mt-0 lg:w-4/12 w-3/6 lg:h-full' />
        <div className='lg:flex hidden lg:flex-col gap-20 text-center'>
          <p>More <span className='text-green-700 font-bold'>Vegetables</span>, healthier <span className='text-black font-bold'>Life</span></p>
          <div>
            <p className='text-2xl font-bold'>4+</p>
            <p>Categories</p>
          </div>
          <div>
            <p className='text-2xl font-bold'>1 Store</p>
            <p>Life-long supply</p>
          </div>
        </div>
      </section>

    {/* Our Vegetable Session */}
      <section className='my-40'>
        <div className='flex items-center justify-between lg:w-5/6 mx-auto'>
          <p className='text-xl font-bold'>{toggle ? "Our Vegetables" : "Our Roots"}</p>
          <div className='flex gap-2'>
            <motion.div whileTap={{scale: 0.7}} 
              onClick={scroll}
              className='h-10 hover:bg-green-600 flex justify-center shadow-md cursor-pointer items-center text-white w-10 bg-green-800 rounded-xl '>
              <MdChevronLeft className='text-xl' />
            </motion.div>
            <motion.div whileTap={{scale: 0.7}} 
              onClick={scroll}
              className='h-10 hover:bg-green-600 flex justify-center shadow-md cursor-pointer items-center text-white w-10 bg-green-800 rounded-xl '>
              <MdChevronRight className='text-xl' />
            </motion.div>
          </div>
        </div>

        <div
          
         id="vegetableContainer" className='lg:w-5/6 mx-auto my-5 py-2 overflow-x-scroll lg:flex-wrap lg:overflow-x-hidden scrollbar-none flex gap-7'>
          {toggle ? vegetableDisplayContainer : rootDisplayContainer}
        </div>
      </section>

      
      {/* Menu Session */}
      <section className='my-10'>
        <div className='text-center text-xl font-bold'>Our Produce</div>
        <div className='flex gap-8 justify-center mt-5'>
          {hold}
        </div>
      </section>
    </div>
  )
}

export default Home