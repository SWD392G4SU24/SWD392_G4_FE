import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
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
import ProductAll from "./Page/product/all";
import AboutUs from "./Page/about";
import FillInformationForPurchase from "./Page/purchaseinformation";
import Payment from "./Page/cart/payment";
import HoaTai from "./Page/product/eachProduct/HoaTai";
import DayChuyen from "./Page/product/eachProduct/DayChuyen";
import Nhan from "./Page/product/eachProduct/Nhan";
import VongTay from "./Page/product/eachProduct/VongTay";
import ProductDetail2 from "./Page/product/productDetail/index2";
import DiamondPrice from "./Page/diamondPrice";
import Admin from "./Page/admin";
import ManageProducts from "./Page/manage products";
import Accounts from "./Page/admin/accounts";
import Chart from "./component/chart/Chart";
// import Revenue from "./Page/admin/revenue";
import Manager from "./Page/manager";
import Profile1 from "./Page/Profile/Profile1";

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
          path: "/profile1",
          element: <Profile1 />,
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
          path: "/diamondprice",
          element: <DiamondPrice />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/orderreview",
          element: <OrderReview />,
        },
        {
          path: "/prodetail/:id",
          element: <ProductDetail2 />,
        },
        {
          path: "/proall",
          element: <ProductAll />,
        },
        {
          path: "/aboutus",
          element: <AboutUs />,
        },
        {
          path: "/purchaseinformation",
          element: <FillInformationForPurchase />,
        },
        {
          path: "/payment",
          element: <Payment />,
        },
        {
          path: "/ht",
          element: <HoaTai />,
        },
        {
          path: "/dc",
          element: <DayChuyen />,
        },
        {
          path: "/n",
          element: <Nhan />,
        },
        {
          path: "/vt",
          element: <VongTay />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/crudproduct",
          element: <ManageProducts />,
        },
        {
          path: "/accounts",
          element: <Accounts />,
        },
        {
          path: "/chart",
          element: <Chart />,
        },
        {
          path: "/manager",
          element: <Manager />,
        },
        // {
        //   path: "/revenue",
        //   element: <Revenue />,
        // },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/login1" element={<Login1 />} />
              <Route path="/register" element={<Register />} />
              <Route path="/accounts" element={<Accounts />} />
            </Route>
          </Routes>
        </RouterProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
