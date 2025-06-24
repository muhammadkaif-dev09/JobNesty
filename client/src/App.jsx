import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "../pages/UserProfile";
import SingleJobDetails from "../pages/SingleJobDetails";
import Admin from "../pages/Admin";
import ApplicantList from "../pages/ApplicantList";
import PostJobPage from "../pages/PostJobAdmin";

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
    element: <PostJobPage />,
  },
  {
    path: "/admin/allapplicantlist/:jobId",
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
