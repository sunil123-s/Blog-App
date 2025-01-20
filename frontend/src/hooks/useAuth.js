import { useState,useEffect } from "react"

const useAuth = () => {
    const [user, setuser] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const userInfo = localStorage.getItem("token")
      if(userInfo){
        setuser(JSON.parse(userInfo))
      }
      setLoading(false); 
    }, [])

    const logout = () => {
        setuser(null)
        localStorage.removeItem("token");
    }
    
    return { user, logout, setuser, loading };
}

export default useAuth;