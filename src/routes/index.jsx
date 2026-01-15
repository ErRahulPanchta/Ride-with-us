import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Rides from "../pages/Rides";
import Signup from "../pages/Signup";
import Drivers from "../pages/Drivers";
import Login from "../pages/Login";
import DriverDashboard from "../pages/DriverDashboard";
import PrivateRoute from "../components/PrivateRoute";
import CurrentRide from "../pages/CurrentRide";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "rides", element: <Rides /> },
      { path: "drivers", element: <Drivers /> },
      { path: "current-ride", element: <CurrentRide /> },


      /* ✅ Rider live ride page */
      {
        path: "current-ride",
        element: (
          <PrivateRoute role="rider">
            <CurrentRide />
          </PrivateRoute>
        )
      },

      /* optional direct ride view */
      {
        path: "ride/:rideId",
        element: (
          <PrivateRoute>
            <CurrentRide />
          </PrivateRoute>
        )
      }
    ]
  },

  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },

  {
    path: "/driver/dashboard",
    element: (
      <PrivateRoute role="driver">
        <DriverDashboard />
      </PrivateRoute>
    )
  }
]);

export default router;
