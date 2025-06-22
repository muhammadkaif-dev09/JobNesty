import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Profile from "../pages/UserProfile";
import AuthNavbar from "./components/AuthNavBar";
import SingleJobDetails from "../pages/SingleJobDetails";
import AuthForm from "./components/AuthForm";
import AdminAddJob from "../pages/AddAdminJob";
import Admin from "../pages/Admin";
import ApplicantList from "../pages/ApplicantList";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Register />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/home",
    element: (
      <div>
        <Home />
      </div>
    ),
  },
  {
    path: "/profile",
    element: (
      <div>
        <Profile />
      </div>
    ),
  },
  {
    path: "/jobId/:jobId",
    element: (
      <div>
        <SingleJobDetails />
      </div>
    ),
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/admin/addJob",
    element: <AdminAddJob />,
  },
  {
    path: "/admin/allapplicantlist",
    element: <ApplicantList />,
  },
]);

// const router = createBroserRouter({});

function App() {
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
