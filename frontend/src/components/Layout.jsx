import React from "react";
import Header from "./Header";
import Fotter from "./Fotter";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  const noHeaderFooterRoutes = ["/register", "/login"];

  const isNoHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {!isNoHeaderFooter && <Header />}
      <div className={`${!isNoHeaderFooter ? "flex-grow" : ""}`}>
        <Outlet />
      </div>
      {!isNoHeaderFooter && <Fotter />}
    </>
  );
};

export default Layout;
