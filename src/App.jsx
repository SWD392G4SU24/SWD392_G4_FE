import Layout from "./component/layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./component/login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
