import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Pages/Root";
import Error from "./Pages/Error";
import NewsletterPage from "./Pages/Newsletter";
import Login from "./Pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children:[
      {
        path: "/login",
        element: <Login />,
        errorElement: <Error />,
      },
    ]
  },
  
  {
    path: "newsletter",
    element: <NewsletterPage />,
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
