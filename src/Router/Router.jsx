import { createBrowserRouter } from "react-router";
import App from "../App";
import LandingLayou from "../pages/Landing/LandingLayou";
import Landing from "../pages/Landing/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <LandingLayou />,
        children: [
          {
            index: true,
            element: <Landing />,
          },
        ],
      },
    ],
  },
]);

export default router;
