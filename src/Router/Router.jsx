import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import REgister from "../Pages/Register/REgister";

const router = createBrowserRouter([ 
      {
            path: '/',
            element: <MainLayout></MainLayout>,
            children: [ 
                  {
                        path: '/',
                        element: <Home></Home>
                  },
                  {
                        path: '/login',
                        element: <Login></Login>
                  },
                  {
                        path: '/register',
                        element: <REgister></REgister>
                  }
            ]
      }
])

export default router;