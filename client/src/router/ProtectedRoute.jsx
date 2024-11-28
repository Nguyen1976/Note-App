import { Outlet, useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
function ProtectedRoute() {
  const navigate = useNavigate();
  if (!localStorage.getItem("accessToken")) {
    navigate("/login");
  }
  return (
    <>
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
