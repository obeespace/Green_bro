import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ContactPage = () => {
    const {staffId, userId} = useParams()
    const navigate = useNavigate()
    function handleClick(){
        navigate("/")
    }
  return (
    <div>
        <div>ContactPage {staffId}{userId}</div>
        <button onClick={handleClick}>Click Me</button>
    </div>
  )
}

export default ContactPage