import Layout from "./component/layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./component/home";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
// import Register from "./component/register/regis";
import Login1 from "./component/login/login";
import ScanBarcode from "./component/scan barcode";
import GoldPrice from "./component/goldPrice";
import Cart from "./component/cart";
import Register from "./component/register/regis";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/login1",
          element: <Login1 />,
        },
        {
          path: "/Register",
          element: <Register />,
        },
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/scanbarcode",
          element: <ScanBarcode />,
        },
        {
          path: "/goldprice",
          element: <GoldPrice />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
