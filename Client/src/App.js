import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Pages/Root";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import AddVehical from "./Pages/admin/AddVehical";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children:[
      {
        index:true,
        element: <AddVehical />,
        errorElement: <Error />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <Error />,
      },
    ]
  },
  
  
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
