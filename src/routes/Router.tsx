import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeManPage from "../pages/HomeManPage";
import HomeClientPage from "../pages/HomeClientPage";
import { CandidatePage } from "../pages/CandidatePage";
import { AuthPage } from "../pages/AuthPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { Layout } from "../layouts/Layout";
import { Paths } from "./paths";
import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/guestGuard";
import { RoleType } from "../types/user.types";
import LandingPage from "../pages/LandingPage";
import ManagerLoginPage from "../pages/ManagerLoginPage";
import { JobPage } from "../pages/JobPage";
import { ManagerPage } from "../pages/ManagerPage";
import { UserPage } from "../pages/UserPage";
import { RequirrnmentPage } from "../pages/RequirnmentPage";
import { SkillsPage } from "../pages/SkillsPage";
import { SendResume } from "../pages/SendResumeClientPage";
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      {
        path: Paths.home, // "homeManPage"
        element: (
          <AuthGuard roles={[RoleType.Admin]}>
            <HomeManPage />
          </AuthGuard>
        ),
      },
      {
        path: Paths.homeClient, // "home-client"
        element: (
          <AuthGuard roles={[RoleType.User]}>
            <HomeClientPage />
          </AuthGuard>
        ),
      },
      {
        path: Paths.candidate, // "candidate"
        element: (
          <AuthGuard roles={[RoleType.Admin]}>
            <CandidatePage />
          </AuthGuard>
        ),
      },
      {
        path: Paths.addJob, // "add-job"
        element: (
          <AuthGuard roles={[RoleType.Admin]}>
            <JobPage />
          </AuthGuard>
        ),
      },
      {
        path: Paths.sendResume, // "send-resume"
        element: (
          <AuthGuard roles={[RoleType.User]}>
            <SendResume />
          </AuthGuard>
        ),
      },
      {
        path: Paths.managers, // "managers"
        element: (
          <AuthGuard roles={[RoleType.Admin]}>
            <ManagerPage />
          </AuthGuard>
        ),
      },
      {
        path: Paths.skills, // "skills"
        element: (
          <AuthGuard roles={[RoleType.Admin]}>
            <SkillsPage />
          </AuthGuard>
        ),
      },
      {
        path: Paths.requirnments, // "requirnments"
        element: (
          <AuthGuard roles={[RoleType.Admin]}>
            <RequirrnmentPage />
          </AuthGuard>
        ),
      },
      {
        path: Paths.users, // "users"
        element: (
          <AuthGuard roles={[RoleType.Admin]}>
            <UserPage />
          </AuthGuard>
        ),
      },
    ],
  },
  {
    path: Paths.auth, // "auth"
    element: (
      <GuestGuard>
        <AuthPage />
      </GuestGuard>
    ),
    children: [
      { path: Paths.login, element: <LoginPage /> }, // "login"
      { path: Paths.register, element: <RegisterPage /> }, // "register"
      { path: "manager-login", element: <ManagerLoginPage /> },
    ],
  },
  {
    path: "*",
    element: <h1>404 - Page Not Found</h1>,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;