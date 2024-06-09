import Layout from "./component/layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./component/login";
import HomePage from "./component/home";

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
