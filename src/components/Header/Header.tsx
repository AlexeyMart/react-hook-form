import { FC } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { AppRoutes } from "../../constants";

export interface ILink {
  path: string;
  label: string;
}

const links: ILink[] = [
  {
    path: AppRoutes.Main,
    label: "Home Page",
  },
  { path: AppRoutes.Form, label: "Form" },
  { path: AppRoutes.YupForm, label: "YupForm" },
];

export const Header: FC = () => {
  const renderLink = ({ label, path }: ILink) => (
    <NavLink key={label} className="header_link" to={path}>
      {label}
    </NavLink>
  );

  return <header className="header">{links.map(renderLink)}</header>;
};
