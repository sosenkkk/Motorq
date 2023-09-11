import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Pages/Root";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import AddVehicleMMY from "./Pages/admin/AddVehicleMMY";
import EnrollmentRequest from "./Pages/user/EnrollmentRequest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <AddVehicleMMY />,
        errorElement: <Error />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <Error />,
      },
      {
        path: "/enroll-vehicle",
        element: <EnrollmentRequest />,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
