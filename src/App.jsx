import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import Layout from "./component/layout";
import Login1 from "./Page/login/login";
import Register from "./Page/register/regis";
import Profile from "./Page/Profile/Profile";
import HomePage from "./Page/home/index";
import ScanBarcode from "./Page/scan barcode/index";
import GoldPrice from "./Page/goldPrice/index";
import Cart from "./Page/cart/index";
import OrderReview from "./Page/cart/orderreview/index";


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
          path: "/orderreview",
          element: <OrderReview />,

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
