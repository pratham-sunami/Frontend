import React, { useState } from 'react'

const Input = ({id, type , setShowAddInput ,submit, setShowEdit}) => {
    const [text,setText] = useState("")
  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} style={{width:"20rem",height:"4rem"}}/>
      <span style={{cursor:"pointer"}} onClick={() => {
        submit(id,text)
        setText("")
        type === "edit" ? setShowEdit(false) :  setShowAddInput(false)        
      }}>✅</span>  
      <span onClick={() => {
        setText("")
        setShowAddInput(false)
      }} style={{cursor:"pointer"}}>❌</span>  
    </div>
  )
}

export default Input
