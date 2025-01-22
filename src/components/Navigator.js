import FoodBody from "./food/FoodBody";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FoodAbout from "./food/FoodAbout";
import Error from "./Error";
import RestaurantMenu from "./food/RestaurantMenu";
import FoodCart from "./food/FoodCart";
import Login from "./Login";
import GroceryBody from './grocery/GroceryBody';
import OrderSuccessPage from './OrderSuccessPage';
import GroceryCart from "./grocery/GroceryCart";
import GroceryAbout from "./grocery/GroceryAbout";
import NavigationOptions from "./NavigationOptions";
import RestaurantForm from "./server/RestaurantForm";
import AdminHome from "./server/AdminHome";
import MapComponent from "./map/MapComponent";
import ProtectedRoute from "./server/ProtectedRoute";
import AdminLogin from "./server/AdminLogin";
import OrderDetails from "./OrderDetails";
import DeliveryDashboard from "./deliveryPartner/DeliveryDashboard";

const Navigator = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <NavigationOptions />,
    },
    {
      path: "/food",
      element: <FoodBody />,
    },
    {
      path: "/food/about",
      element: <FoodAbout />,
    },
    {
      path: "/food/cart",
      element: <FoodCart />,
    },
    {
      path: "/food/restaurant/:resId",
      element: <RestaurantMenu />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/success",
      element: <OrderSuccessPage />,
    },
    {
      path: "/grocery",
      element: <GroceryBody />
    },
    {
      path: "/grocery/about",
      element: <GroceryAbout />
    },
    {
      path: "/grocery/cart",
      element: <GroceryCart />
    },
    {
      path: "/restaurantform",
      element: <RestaurantForm />,
    },
    {
      path: "/adminhome",
      element: (
        <ProtectedRoute>
          <AdminHome />
        </ProtectedRoute>
      ),
    },
    {
      path: "/adminlogin",
      element: <AdminLogin />,
    },
    {
      path: "/tracker",
      element: <MapComponent />,
    },
    {
      path: "/orderhistory",
      element: <OrderDetails />,
    },
    {
      path: "/delivery",
      element: <DeliveryDashboard />
    },
    {
      path: "/error",
      errorElement: <Error />,
    }
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Navigator;