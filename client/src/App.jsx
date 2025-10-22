import "./App.css";
import NavbarLayout from "./layout/NavbarLayout";
import AdminPanel from "./pages/AdminPanel";
import AllProducts from "./pages/AllProducts";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import UserRegistration from "./pages/UserRegistration";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import PrivateRoute from "./routes/PrivateRoute";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProductDetail from "./pages/ProductDetail";
import AdminProductTable from "./pages/AdminProductTable";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavbarLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/adminpanel", element: <AdminPanel /> },
        { path: "/allproducts", element: <AllProducts /> },
        { path: "/products/:id", element: <ProductDetail /> },
        { path: "/cart", element: <Cart /> },
        { path: "/adminlogin", element: <AdminLogin /> },
        { path: "/producttable", element: <AdminProductTable /> },
        {
          path: "/admindashboard",
          element: (
            <PrivateRoute role="admin">
              <AdminDashboard />
              
            </PrivateRoute>
          ),
        },
        { path: "/userlogin", element: <UserLogin /> },

        {
          path: "/userdashboard",
          element: (
            <PrivateRoute role="user">
              <UserDashboard />
            </PrivateRoute>
          ),
        },
        { path: "/userregistration", element: <UserRegistration /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}

export default App;
