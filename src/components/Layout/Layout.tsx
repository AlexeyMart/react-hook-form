import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import "./Layout.css";

export const Layout: FC = () => {
  return (
    <div className="Layout">
      <Header />

      <Outlet />
    </div>
  );
};
