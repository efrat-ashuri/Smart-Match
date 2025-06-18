//  import { Outlet } from "react-router-dom";
// import Navbar from "../components/NavLink"; // או "../components/Navbar" אם שינית שם קובץ

// const Layout = () => {
//   return (
//     <>
//       <header>
//         <Navbar /> {/* שים לב: בלי להעביר userType או setUserType */}
//       </header>
//       <main>
//         <Outlet />
//       </main>
//     </>
//   );
// };

// export default Layout;

// Layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavLink";

const Layout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
