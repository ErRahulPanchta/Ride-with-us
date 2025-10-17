import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Home from "../pages/Home";
import Login from "../pages/Login";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Rides from "../pages/Rides";
import Signup from "../pages/Signup";
import Drivers from "../pages/Drivers";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/rides",
                element: <Rides />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/drivers",
                element: <Drivers />
            }
        ]
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/login",
        element: <Login />
    }
])
export default router