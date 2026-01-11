import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Aboutus from "./components/about-us";
import Product from "./components/product";
import Blog from "./components/blog";
import Contactus from "./components/contact-us";
import Home from "./components/home";
import Signup from "./components/signup";
import Login from "./components/login";
import Logout from "./components/logout";
import AddProduct from "./components/Add-product";
import ViewProduct from "./components/view-product.jsx";
import Favorite from "./components/whishlist.jsx";
import Bag from "./components/Bag.jsx";
import Addblog from "./components/add-blog.jsx";
import BlogViews from "./components/blog-view.jsx";
import Viewadminproduct from "./components/viewAdminProduct.jsx";
import UpdateProduct from "./components/updateproduct.jsx";
import Admindashboard from "./components/admindashboard.jsx";
import AdminviewBlog from "./components/adminview-blog.jsx";
import UpdateBlog from "./components/updateBlog.jsx";

const router = createBrowserRouter([
  { path: "/admin/add-product", element: <AddProduct></AddProduct> },
  { path: "/admin/add-blog", element: <Addblog></Addblog> },
  {
    path: "/admin/Viewadminproduct",
    element: <Viewadminproduct></Viewadminproduct>,
  },
  { path: "admin/updateproduct/:id", element: <UpdateProduct></UpdateProduct> },
  { path: "/admin/dashboard", element: <Admindashboard></Admindashboard> },
  {path:"/admin/blogs",element:<AdminviewBlog></AdminviewBlog>},
  {path:"admin/updateblog/:id",element:<UpdateBlog></UpdateBlog>},
  {
    path: "/",
    element: <App></App>,

    children: [
      { path: "/", element: <Home></Home> },
      { path: "product", element: <Product></Product> },
      { path: "about-us", element: <Aboutus></Aboutus> },
      { path: "blog", element: <Blog></Blog> },
      { path: "contact-us", element: <Contactus></Contactus> },
      { path: "signup", element: <Signup></Signup> },
      { path: "login", element: <Login></Login> },
      { path: "logout", element: <Logout></Logout> },

      { path: "/admin/add-blog", element: <Addblog></Addblog> },

      { path: "viewProduct/:id", element: <ViewProduct /> },

      { path: "blog/:id", element: <BlogViews></BlogViews> },
      { path: "favorite", element: <Favorite></Favorite> },

      { path: "bag", element: <Bag></Bag> },
      // { path: "/admin/dashboard", element: <Admindashboard></Admindashboard>  },
    ],
  },
]);

// const AdminRouter =createBrowserRouter([{
//   path:"/admin/dashboard",element:<Admindashboard></Admindashboard>
// }])
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App></App>,
//     Children: [
//       { path: "about-us", element: <Aboutus></Aboutus> },
//       { path: "product", element: <Product></Product> },
//       { path: "blog", element: <Blog></Blog> },
//       { path: "contact-us", element: <Contactus></Contactus> },
//     ],
//   },
// ]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
    {/* <RouterProvider router={AdminRouter}></RouterProvider> */}
  </StrictMode>
);
