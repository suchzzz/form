import { useContext, createContext, useState } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthnticated,setIsAuthnticated]=useState(true);

  return (
    <AuthContext.Provider value={{ isAuthnticated }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};