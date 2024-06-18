import Layout from "./component/layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Profile from "./Page/Profile/Profile";
import HomePage from "./Page/home";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
// import Register from "./component/register/regis";
import Login1 from "./Page/login/login";
import ScanBarcode from "./Page/scan barcode";
import GoldPrice from "./Page/goldPrice";
import Cart from "./Page/cart";
import Register from "./Page/register/regis";
import ProductDetail from "./Page/product/productDetail";
import ProductAll from "./Page/product/all";
import AboutUs from "./Page/about";

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
          path: "/profile",
          element: <Profile />,
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
        {
          path: "/prodetail",
          element: <ProductDetail />,
        },
        {
          path: "/proall",
          element: <ProductAll />,
        },
        {
          path: "/aboutus",
          element: <AboutUs />,
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
