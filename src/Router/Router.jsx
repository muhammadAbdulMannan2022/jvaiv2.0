import { createBrowserRouter } from "react-router";
import App from "../App";
import LandingLayou from "../pages/Landing/LandingLayou";
import Landing from "../pages/Landing/Landing";
import Services from "../pages/services/Services";
import AboutPage from "../pages/About/AboutUs";
import ProjectDetails from "../components/servicePage/ProjectDetails";
import Career from "../pages/career/Career";
import JobDetails from "../pages/career/JobDetails";
import TeamPage from "../pages/Team/Team";
import Works from "../pages/Works/Works";
import ContactPage from "../pages/Contact/ContactUs";
import BlogPage from "../pages/Blog/BlogPage";
import BlogEditor from "../pages/Blog/Editor";
import BlogDetails from "../pages/Blog/BlogDetails";

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
          {
            path: "team",
            element: <TeamPage />,
          },
          {
            path: "work",
            element: <Works />,
          },
          {
            path: "contact",
            element: <ContactPage />,
          },
          {
            path: "blog",
            element: <BlogPage />,
          },
          {
            path: "blog-editor",
            element: <BlogEditor />,
          },
          {
            path: "blog/:id",
            element: <BlogDetails />,
          },
        ],
      },
    ],
  },
]);

export default router;
