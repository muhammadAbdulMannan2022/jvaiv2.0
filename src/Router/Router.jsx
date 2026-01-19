import { createBrowserRouter } from "react-router";
import App from "../App";
import LandingLayou from "../pages/Landing/LandingLayou";
import Landing from "../pages/Landing/Landing";
import Services from "../pages/services/Services";
import AboutPage from "../pages/About/AboutUs";
import ProjectDetails from "../components/servicePage/ProjectDetails";
import Career from "../pages/career/Career";
import JobDetails from "../pages/career/JobDetails";

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
          {
            path: "services",
            element: <Services />,
          },
          {
            path: "about",
            element: <AboutPage />,
          },
          {
            path: "projects",
            element: <ProjectDetails />,
          },
          {
            path: "career",
            element: <Career />,
          },
          {
            path: "career/:id",
            element: <JobDetails />,
          },
        ],
      },
    ],
  },
]);

export default router;
