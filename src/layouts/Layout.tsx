import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavLink";

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

