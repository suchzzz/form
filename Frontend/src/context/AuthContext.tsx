import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { INavLinkGroup } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
interface IUser{
  email:string,
  role:string,
  changedPassword:boolean
  OrgId:string;
}
interface IAuthContext {
  isAuthnticated: boolean,
  changedPassword:boolean,
  user: IUser,
  // user:{},
  setUser: React.Dispatch<React.SetStateAction<{}>>,
  logout: () => void,
  validate: () => void,
  role: string,
  nav: INavLinkGroup[],
  isLogin: boolean,
  login: (data: any) => void,
  setIsAuthnticated: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>,
  loading: boolean,
  setChangedPassword:React.Dispatch<React.SetStateAction<boolean>>,
}
const AuthContext = createContext<IAuthContext>({} as IAuthContext);
const initalLinks=[{
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
      }]
  }];
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BASE_URL;
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthnticated, setIsAuthnticated] = useState<boolean>(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true);
  const [changedPassword,setChangedPassword]=useState<boolean>(true)
  const [nav, setNav] = useState<INavLinkGroup[]>(initalLinks);

  const logout = (() => {
    setUser({});
    setIsAuthnticated(false);
    localStorage.setItem("token", "");
    setRole("");
    setNav(initalLinks);
    setToken("")
    setIsLogin(true);
  })
  // console.log(role);

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
        console.log(res.data.user);
        token = res.data.token;
        setToken(token);
        localStorage.setItem("token", token);
        setIsAuthnticated(true);
        //  console.log(res.data)
        setUser(res.data);
        
        if (!res.data.user.changedPassword) {
          setChangedPassword(false)
          navigate("cp")
        }
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
        setToken(token);
        setIsAuthnticated(true);
        setRole("admin");
        //  console.log(res.data)
        setUser(res.data);
      
      })
    }
    navigate("/");
  })
  useEffect(() => {
    // console.log("useEffect",token)
    if (token == "") {
      setLoading(false);
      return
    }

    validate();
    // console.log("after validate")
    axios.get(`${API_URL}/api/auth/me`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => {
      // console.log(res)
      if (res.statusText == 'OK') {
        // console.log(res.data)
        setUser(res.data);
        setRole(res.data.role);
        setIsAuthnticated(true);
      }
    }).finally(() => {
      setLoading(false);
    })
  }, [isAuthnticated, token])
  useEffect(() => {
    // console.log(user);
  }, [user])

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
    else
    {
      setNav(initalLinks);
    }
  }, [role])
  return (
    <AuthContext.Provider value={{ isAuthnticated, setIsAuthnticated, user, changedPassword,setUser, logout, validate, role, nav, isLogin, login, setIsLogin, setChangedPassword,loading } as IAuthContext}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};