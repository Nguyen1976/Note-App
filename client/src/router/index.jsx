import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AuthProvider from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import NodeList from "../components/NodeList";
import Note from "../components/Note";

// AuthLayout sẽ bao bọc các trang con (Login, Home)
// AuthLayout.js

// eslint-disable-next-line react-refresh/only-export-components
const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: "/",
            loader: async () => {
              const query = `
                query Folders {
                  folders {
                    id
                    name
                    createdAt
                  }
                }
              `;
              const res = await fetch("http://localhost:4000/graphql", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  query,
                }),
              });
              const { data } = await res.json();
              return data;
            },
            children: [
              {
                element: <NodeList />,
                path: `folders/:folderId`,
                children: [
                  {
                    element: <Note />,
                    path: `note/:noteId`,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
