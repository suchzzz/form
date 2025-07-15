import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { INavLinkGroup } from '@fluentui/react';
const AuthContext = createContext<{
  isAuthnticated: boolean,
  user: {},
  setUser: React.Dispatch<React.SetStateAction<{}>>,
  logout: () => void,
  validate: () => void,
   role: string,
   nav: INavLinkGroup[],
   isLogin:boolean ,
   login:(data:any)=>void,
   setIsAuthnticated:React.Dispatch<React.SetStateAction<boolean>>,
   setIsLogin: React.Dispatch<React.SetStateAction<boolean>>,

} | null>(null);

const AuthProvider = ({ children }) => {

  const API_URL = import.meta.env.VITE_BASE_URL;
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthnticated, setIsAuthnticated] = useState<boolean>(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState<string>("")
  const [nav, setNav] = useState<INavLinkGroup[]>([{
        links: [
          {
            name: 'Dashboard',
            url: '/',
            icon: 'DashboardAdd',
            key: 'key1'
          },
          {
            name: 'Leaves',
            url: '/leaves',
            key: 'key3',
            icon: "Leave"
          },
          {
            name: 'Attendance request',
            url: '/attendance',
            key: 'key4',
            icon: "EventDateMissed12"
          },
          {
            name: 'Report',
            url: '/report',
            key: 'key5',
            icon: "ReportDocument"
          },
          {
            name: 'Event',
            url: '/event',
            key: 'key6',
            icon: "Event"
          },
          {
            name: 'Company Policy',
            url: '/policy',
            key: 'key7',
            icon: 'EntitlementPolicy',
          },]
      }]);

  const logout= (() => {
    setUser({});
    setIsAuthnticated(false);
    localStorage.setItem("token", "");
    setRole("");
    setToken("")
  })
  console.log(role);

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
          // console.log("hio");
          if (res.status == 200)
            localStorage.setItem("token", res.data.newAcessToken); 
        }).catch(() => {
          // localStorage.setItem("token","");
        });
      }
    });
  });
    const login = ((data) => {
        const API_URL = import.meta.env.VITE_BASE_URL;
        let Config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        let token = "";
        setToken("");
        if (isLogin) {
            axios.post(`${API_URL}/api/auth/login`, {
                "email": data.email,
                "password": data.password
            }, Config).then((res) => {
                // console.log(res);
                token = res.data.token;
                setToken(token);
                localStorage.setItem("token", token);
                setIsAuthnticated(true);
                setUser(res.data.user);
            })
        }
        else {
            axios.post(`${API_URL}/api/auth`, {
                "name": data.name,
                "email": data.email,
                "password": data.password
            }, Config).then((res) => {
                token = res.data.token;
                localStorage.setItem("token", token);
                setIsAuthnticated(true);
                setUser(res.data.user);
            })
        }

    })
  useEffect(() => {
    console.log("useEffect",token)
    if (token == "")
      return
    
    validate();
    console.log("after validate")
    axios.get(`${API_URL}/api/auth/me`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res)
      if (res.statusText == 'OK') {
        setUser(res.data.user);
        setRole(res.data.role);
        setIsAuthnticated(true);
      }
    })
  }, [isAuthnticated, token])

  useEffect(() => {
    if (role == "admin") {
      setNav([{
        links: [
          {
            name: 'Dashboard',
            url: '/',
            icon: 'DashboardAdd',
            key: 'key1'
          }, {
            name: 'Employyes',
            url: '/emp',
            key: 'key2',
            icon: 'TemporaryUser',
          },
          {
            name: 'Leaves',
            url: '/leaves',
            key: 'key3',
            icon: "Leave"
          },
          {
            name: 'Attendance request',
            url: '/attendance',
            key: 'key4',
            icon: "EventDateMissed12"
          },
          {
            name: 'Report',
            url: '/report',
            key: 'key5',
            icon: "ReportDocument"
          },
          {
            name: 'Event',
            url: '/event',
            key: 'key6',
            icon: "Event"
          },
          {
            name: 'Company Policy',
            url: '/policy',
            key: 'key7',
            icon: 'EntitlementPolicy',
          },]
      }])
    }
  }, [role])

  return (
    <AuthContext.Provider value={{ isAuthnticated, setIsAuthnticated, user, setUser, logout, validate, role, nav,isLogin,login,setIsLogin}}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};