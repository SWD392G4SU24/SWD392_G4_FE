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
import Accounts from "./Page/admin/accounts";
import Chart from "./component/chart/Chart";
import Manager from "./Page/manager";
import LayoutOfAdmin from "./component/layout/index2";
import AdminPage2 from "./Page/admin/revenue/index2";
import Tutorial from "./Page/rule/tutorial";
import TutorialSize from "./Page/rule/tutorial/ringSize";
import BracletSize from "./Page/rule/tutorial/bracletSize";
import NecklaceSize from "./Page/rule/tutorial/necklaceSize";
import ReturnWarranty from "./Page/rule/returns";
import BuyTutorial from "./Page/rule/tutorial/buyProduct";
import SecurityInfo from "./Page/rule/security";
import UserSearch from "./Page/staff/index2";
import StaffOrder from "./Page/staff/order";
import ManageForm from "./Page/form";
import ManagePromotion from "./Page/promotion";
import DongHo from "./Page/product/eachProduct/DongHo";
import Kieng from "./Page/product/eachProduct/Kieng";
import Lac from "./Page/product/eachProduct/Lac";
import {
  ValidRouteAdmin,
  ValidRouteManager,
  ValidRouteStaff,
} from "./route/protectedRoute";
import ReOrder from "./Page/staff/re-order";
import LayoutStaff from "./component/layout/index3";
import CheckReceiveOrder from "./Page/staff/checkreceiveorder";
import ManageProducts from "./Page/manage products";

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
          path: "/dh",
          element: <DongHo />,
        },
        {
          path: "/kg",
          element: <Kieng />,
        },
        {
          path: "/lac",
          element: <Lac />,
        },
        {
          path: "/vt",
          element: <VongTay />,
        },
        {
          path: "/chart",
          element: <Chart />,
        },
        {
          path: "/tutorial",
          element: <Tutorial />,
        },
        {
          path: "/ringtutor",
          element: <TutorialSize />,
        },
        {
          path: "/braceletutor",
          element: <BracletSize />,
        },
        {
          path: "/necklacetutor",
          element: <NecklaceSize />,
        },
        {
          path: "/returnswar",
          element: <ReturnWarranty />,
        },
        {
          path: "/buytutor",
          element: <BuyTutorial />,
        },
        {
          path: "/securityinfo",
          element: <SecurityInfo />,
        },
      ],
    },
    {
      element: <LayoutOfAdmin />,
      children: [
        {
          path: "/manager",
          element: <ValidRouteManager element={<Manager />} />,
        },
        {
          path: "/dashboard",
          element: <ValidRouteAdmin element={<AdminPage2 />} />,
        },
      ],
    },
    {
      element: <LayoutStaff />,
      children: [
        {
          path: "/staffsearch",
          element: <ValidRouteStaff element={<UserSearch />} />,
        },
      ],
    },

    {
      path: "/stafforder",
      element: <ValidRouteStaff element={<StaffOrder />} />,
    },
    {
      path: "/reorder",
      element: <ValidRouteStaff element={<ReOrder />} />,
    },
    {
      path: "/checkreceive",
      element: <ValidRouteStaff element={<CheckReceiveOrder />} />,
    },
    {
      path: "/promotion",
      element: <ValidRouteManager element={<ManagePromotion />} />,
    },
    {
      path: "/crudproduct",
      element: <ValidRouteManager element={<ManageProducts />} />,
    },
    {
      path: "/form",
      element: <ValidRouteManager element={<ManageForm />} />,
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
