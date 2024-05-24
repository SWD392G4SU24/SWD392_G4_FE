import React, { Children } from "react";
import HomePage from "./component/pages/home";
import { Layout } from "antd";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      Children: [
        {
          path: "/",
          element: <HomePage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
