import Layout from "./component/layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./component/login";
import Profile from "./Page/Profile/Profile";

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
          path: "/profile",
          element: <Profile />
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
