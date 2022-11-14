import Header from "./components/Header";
import {Routes, Route} from "react-router-dom"
import Home from "./Pages/Home";
import AddNew from "./Pages/AddNew";
import {AnimatePresence} from "framer-motion"
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import { useStateValue } from "./context/StateProvider";
import { getAll } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import { useEffect, useState } from "react";

function App() {

  const [{items}, dispatch] = useStateValue()
  const [isPending, setPending] = useState(false)

  const fetchData = async ()=> {
    await getAll().then((data) => {
      console.log(data)
      setPending(true)
      dispatch ({
        type: actionType.SET_ITEMS,
        items : data
      })
    })
  }

  useEffect(()=>{
    fetchData()
  }, [])

  return (
    <AnimatePresence wait>
    {isPending && <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
          <Route path="/new-item" element={<AddNew/>}/>
        </Routes>
      </div>}
    </AnimatePresence>
  );
}

export default App;
