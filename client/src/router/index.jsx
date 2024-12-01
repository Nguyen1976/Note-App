import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AuthProvider from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import NodeList from "../components/NodeList";
import Note from "../components/Note";
import { addNewNote, noteLoader, notesLoader, updateNote } from "../utils/noteUtils";
import { foldersLoader } from "../utils/folderUtils";

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
            loader: foldersLoader,
            children: [
              {
                element: <NodeList />,
                path: `folders/:folderId`,
                action: addNewNote,
                loader: notesLoader,
                children: [
                  {
                    element: <Note />,
                    path: `note/:noteId`,
                    loader: noteLoader,
                    action: updateNote,
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
