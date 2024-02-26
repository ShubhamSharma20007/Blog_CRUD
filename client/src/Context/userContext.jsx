import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const [currentUser, setCurrentUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const[user,setUser] = useState("")


  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);


  //  current user login
    useEffect(()=>{
      const fetchAPI =async()=>{
        const res = await axios.post(`${process.env.REACT_APP_BASE_USER_URL }/${currentUser?.id}`)
        const data = await res.data;
        setUser(data?.model )
  
      }
      fetchAPI()
    },[currentUser])

  
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser,user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
