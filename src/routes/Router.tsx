// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import HomeManPage from "../pages/HomeManPage";
// import HomeClientPage from "../pages/HomeClientPage";
// import { CandidatePage } from "../pages/CandidatePage";
// import { AuthPage } from "../pages/AuthPage";
// import LoginPage from "../pages/LoginPage";
// import RegisterPage from "../pages/RegisterPage";
// import { Layout } from "../layouts/Layout";
// import { Paths } from "./paths";
// import AuthGuard from "../auth/AuthGuard";
// import GuestGuard from "../auth/guestGuard";
// import { RoleType } from "../types/user.types";
// import LandingPage from "../pages/LandingPage";
// import { JobPage } from "../pages/JobPage";
// import { ManagerPage } from "../pages/ManagerPage";
// import { UserPage } from "../pages/UserPage";
// import { RequirrnmentPage } from "../pages/RequirnmentPage";
// import { SkillsPage } from "../pages/SkillsPage";
// import { SendResume } from "../pages/SendResumeClientPage";
// import JobList from "../components/job/JobList";
// import CandidateList from "../components/candidate/CandidateList";
// import RequirnmentList from "../components/requirnment/RequirnmentList";
// import SkillList from "../components/skills/SkillsList";
// import RequirementList from "../components/requirnment/RequirnmentList";

// // טיפוס לפרופס
// export type RouterProps = {
//   userType: "none" | "manager" | "candidate";
//   setUserType: React.Dispatch<React.SetStateAction<"none" | "manager" | "candidate">>;
// };

// const Router = ({ userType, setUserType }: RouterProps) => {
//   const router = createBrowserRouter([
//     {
//       element: <Layout userType={userType} setUserType={setUserType} />, // מעביר ל-Layout
//       children: [
//         { path: "/", element: <LandingPage /> },
//         {
//           path: Paths.home, // "homeManPage"
//           element: (
//             <AuthGuard roles={[RoleType.Admin]}>
//               <HomeManPage />
//             </AuthGuard>
//           ),
//         },
//         {
//           path: Paths.homeClient, // "home-client"
//           element: (
//             <AuthGuard roles={[RoleType.User]}>
//               <HomeClientPage />
//             </AuthGuard>
//           ),
//         },
//         {
//           path: Paths.candidate, // "candidate"
//           element: (
//             <AuthGuard roles={[RoleType.Admin]}>
//               <CandidatePage />
//             </AuthGuard>
//           ),
//         },
//         {
//           path: Paths.addJob, // "add-job"
//           element: (
//             <AuthGuard roles={[RoleType.Admin]}>
//               <JobPage />
//             </AuthGuard>
//           ),
//         },
//         {
//           path: Paths.sendResume, // "send-resume"
//           element: (
//             <AuthGuard roles={[RoleType.User]}>
//               <SendResume />
//             </AuthGuard>
//           ),
//         },
//         {
//   path: Paths.jobs,
//   element: (
//     <AuthGuard roles={[RoleType.Admin]}>
//       <JobList isManager={true} />
//     </AuthGuard>
//   ),
// },
//       {
//   path: Paths.candidate,
//   element: (
//     <AuthGuard roles={[RoleType.Admin]}>
//       <CandidateList/>
//     </AuthGuard>
//   ),
// },
//       {
//   path: Paths.requirnments,
//   element: (
//     <AuthGuard roles={[RoleType.Admin]}>
//       <RequirementList isManager={true} />
//     </AuthGuard>
//   ),
// },
//       {
//   path: Paths.skills,
//   element: (
//     <AuthGuard roles={[RoleType.Admin]}>
//       <SkillList isManager={true} />
//     </AuthGuard>
//   ),
// },
//         {
//           path: Paths.managers, // "managers"
//           element: (
//             <AuthGuard roles={[RoleType.Admin]}>
//               <ManagerPage />
//             </AuthGuard>
//           ),
//         },
//         {
//           path: Paths.skills, // "skills"
//           element: (
//             <AuthGuard roles={[RoleType.Admin]}>
//               <SkillsPage />
//             </AuthGuard>
//           ),
//         },
//         {
//           path: Paths.requirnments, // "requirnments"
//           element: (
//             <AuthGuard roles={[RoleType.Admin]}>
//               <RequirrnmentPage />
//             </AuthGuard>
//           ),
//         },
//         {
//           path: Paths.users, // "users"
//           element: (
//             <AuthGuard roles={[RoleType.Admin]}>
//               <UserPage />
//             </AuthGuard>
//           ),
//         },
//       ],
//     },
//     {
//       path: Paths.auth, // "auth"
//       element: (
//         <GuestGuard>
//           <AuthPage />
//         </GuestGuard>
//       ),
//       children: [
//         { path: Paths.login, element: <LoginPage /> }, // "login"
//         { path: Paths.register, element: <RegisterPage /> }, // "register"
//         // { path: "manager-login", element: <ManagerLoginPage /> },
//       ],
//     },
//     {
//       path: "*",
//       element: <h1>404 - Page Not Found</h1>,
//     },
//   ]);

//   return <RouterProvider router={router} />;
// };

// export default Router;import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeManPage from "../pages/HomeManPage";
import HomeClientPage from "../pages/HomeClientPage";
import  AllCandidatePage  from "../pages/AllCandidatePage";
import { AuthPage } from "../pages/AuthPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Layout from "../layouts/Layout";
import { Paths } from "./paths";
import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/guestGuard";
import { RoleType } from "../types/user.types";
import LandingPage from "../pages/LandingPage";
import { JobPage } from "../pages/JobPage";
import { ManagerPage } from "../pages/ManagerPage";
import { RequirrnmentPage } from "../pages/RequirnmentPage";
import { SkillsPage } from "../pages/SkillsPage";
import SendResume from "../pages/SendResumeClientPage";
import JobList from "../components/job/JobList";
import CandidateList from "../components/candidate/CandidateList";
import RequirementList from "../components/requirnment/RequirnmentList";
import SkillList from "../components/skills/SkillsList";
import CandidateDetailsPage from "../pages/CandidateDetailsPage"; // ודא שהקובץ קיים
// הוספת דף התאמת מועמדים 
import CandidateMatchPage from "../pages/CandidateMatchPage"; // ודא שהקובץ קיים
const Router = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <LandingPage /> },

        {
          path: Paths.home,
          element: (
            <AuthGuard roles={[RoleType.Admin]}>
              <HomeManPage />
            </AuthGuard>
          ),
        },
        {
          path: Paths.homeClient,
          element: (
            <AuthGuard roles={[RoleType.User]}>
              <HomeClientPage />
            </AuthGuard>
          ),
        },
        {
          path: Paths.candidate,
          element: (
            <AuthGuard roles={[RoleType.Admin]}>
              <AllCandidatePage />
            </AuthGuard>
          ),
        },
        {
          path: Paths.addJob,
          element: (
            <AuthGuard roles={[RoleType.Admin]}>
              <JobPage />
            </AuthGuard>
          ),
        },
        {
          path: Paths.sendResume,
          element: (
            <AuthGuard roles={[RoleType.User]}>
              <SendResume />
            </AuthGuard>
          ),
        },
        {
          path: Paths.viewJobsClient,
          element: (
            <AuthGuard roles={[RoleType.User]}>
              <JobList isManager={false} />
            </AuthGuard>
          ),
        },
        {path: "manager/candidate/:id",
  element: (
    <AuthGuard roles={[RoleType.Admin]}>
      <CandidateDetailsPage />
    </AuthGuard>
  ),
  },
        {
          path: Paths.jobs,
          element: (
            <AuthGuard roles={[RoleType.Admin]}>
              <JobList isManager={true} />
            </AuthGuard>
          ),
        },
        {
          path: Paths.requirnments,
          element: (
            <AuthGuard roles={[RoleType.Admin]}>
              <RequirementList isManager />
            </AuthGuard>
          ),
        },
        {
          path: Paths.skills,
          element: (
            <AuthGuard roles={[RoleType.Admin]}>
              <SkillList isManager />
            </AuthGuard>
          ),
        },
        {
          path: Paths.managers,
          element: (
            <AuthGuard roles={[RoleType.Admin]}>
              <ManagerPage />
            </AuthGuard>
          ),
        },
        // {
        //   path: Paths.users,
        //   element: (
        //     <AuthGuard roles={[RoleType.Admin]}>
        //       <UserPage />
        //     </AuthGuard>
        //   ),
        // },

{
  path: Paths.candidateDetails,
  element: (
    <AuthGuard roles={[RoleType.Admin]}>
      <CandidateDetailsPage />
    </AuthGuard>
  ),
},
{
          path: Paths.match, // ✅ מסך התאמת מועמדים למשרות
          element: (
            <AuthGuard roles={[RoleType.Admin]}>
              <CandidateMatchPage />
            </AuthGuard>
          ),
        }

      ],
    },
    {
      path: Paths.auth,
      element: (
        <GuestGuard>
          <AuthPage />
        </GuestGuard>
      ),
      children: [
        { path: Paths.login, element: <LoginPage /> },
        { path: Paths.register, element: <RegisterPage /> },
      ],
    },
    {
      path: "*",
      element: <h1>404 - Page Not Found</h1>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
