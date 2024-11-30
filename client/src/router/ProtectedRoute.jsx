import { Outlet, Navigate } from "react-router-dom";

/* eslint-disable react/prop-types */
function ProtectedRoute() {
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to={'/login'} />
  }
  return (
    <>
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
