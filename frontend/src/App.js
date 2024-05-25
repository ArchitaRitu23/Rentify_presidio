import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BuyerRegister from "./Pages/BuyerRegister";
import BuyerLogin from "./Pages/BuyerLogin";
import Home from "./Pages/Home";
import AddProperty from "./Pages/AddProperty";
import SellerRegister from "./Pages/SellerRegister";

const router = createBrowserRouter([
  {
    path: "/buyer/register",
    element: <BuyerRegister />,
  },
  {
    path: "/seller/register",
    element: <SellerRegister />,
  },
  {
    path: "/login",
    element: <BuyerLogin />,
  },
  {
    path: "/add_property",
    element: <AddProperty />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
