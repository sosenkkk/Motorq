import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Pages/Root";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import AddVehicleMMY from "./Pages/admin/AddVehicleMMY";
import EnrollmentRequest from "./Pages/user/EnrollmentRequest";
import MyRequests from "./Pages/MyRequest";
import { useSelector } from "react-redux";
import UserRequests from "./Pages/UserRequests";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path:'/',
        element: <AddVehicleMMY />,
        errorElement: <Error />,
      },
      
      {
        path: "/login",
        element: <Login />,
        errorElement: <Error />,
      },

      {
        path: "/my-requests",
        element: <UserRequests />,
        errorElement: <Error />,
      },
    ],
  },
]);

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path:"/",
        element: <EnrollmentRequest />,
        errorElement: <Error />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <Error />,
      },

      {
        path: "/my-requests",
        element: <MyRequests />,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const requests = useSelector((state)=>state.requests.requests)
  console.log(requests)
  return (
    <>
      {isAdmin && <RouterProvider router={router} />}
      {!isAdmin && <RouterProvider router={userRouter} />}
    </>
  );
}

export default App;
