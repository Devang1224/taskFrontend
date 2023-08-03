import React, { createContext, useContext, useEffect, useState } from 'react'


export const taskContext = createContext();



const TaskProvider = ({children}) => {

const[userId,setUserId] = useState("")

useEffect(()=>{

const id =JSON.parse(localStorage.getItem('user'))?.id;

if( typeof id !== "undefined")
  setUserId(id);
     
},[])


  return (
    <taskContext.Provider value={{userId,setUserId}}>
        {children}
    </taskContext.Provider>
    
  )
}

export default TaskProvider