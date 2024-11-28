import { Button, Typography } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useContext } from "react";

import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const auth = getAuth();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, provider);
    console.log(res);
  };

  if (user?.uid) {
    navigate("/");
    return;
  }

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Welcome to Note App
      </Typography>
      <Button variant="outline" onClick={handleLoginWithGoogle}>
        Login with Google
      </Button>
    </>
  );
}

export default Login;
