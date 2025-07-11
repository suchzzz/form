import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const API_URL = import.meta.env.VITE_BASE_URL;
  const [isAuthnticated, setIsAuthnticated] = useState(false);
  const [user, setUser] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));

  const logout = (() => {
    setUser({});
    setIsAuthnticated(false);
    localStorage.setItem("token", "");
    console.log("clicked");
  })

  const validate = (() => {
    axios.get((`${API_URL}/api/auth/stillAuthorized`), {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).catch((res) => {
      const status = res.status;
      if (status == 401) {
        axios.get((`${API_URL}/api/auth/gettoken`), {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }).then((res) => {
          console.log("hio");
          if(res.status==200)
            localStorage.setItem("token", res.data.newAcessToken);1
        }).catch(()=>{
          // localStorage.setItem("token","");
        });
      }
    });
  });

  useEffect(() => {
    if (token == "")
      return
    validate();
    axios.get(`${API_URL}/api/auth/me`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res)
      if (res.statusText == 'OK') {
        setUser(res.data.user);
        setIsAuthnticated(true);
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthnticated, setIsAuthnticated, user, setUser, logout, validate }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};