import { createContext, useState, useEffect } from "react"


export const  UserContext = createContext()


const UserProvide =({children})=>{
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  },[currentUser])

  return<UserContext.Provider value={{currentUser,setCurrentUser}} >{children}</UserContext.Provider>
}


export default UserProvide;