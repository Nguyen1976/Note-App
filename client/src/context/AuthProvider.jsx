/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  const auth = getAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      if (user?.uid) {
        setUser(user);
        localStorage.setItem("accessToken", user.accessToken);
        return;
      }
      setUser({});
      localStorage.clear();
      navigate("/login");
    });

    return () => {
      unsubscribe();
    };
  }, [auth, navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
