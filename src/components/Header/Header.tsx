import "./header.scss";
import { Link } from "react-router-dom";
import useLang from "../../hooks/useLang";
import configs from "../../configs";

import * as authService from "..//..//services/authService";
export default function Header() {
  const { t } = useLang();
  const { i18n } = useLang();
  const menus = [
    {
      title: t("Home.Header.Menus.dashboard"),
      path: configs.paths.dashboard,
    },
    {
      title: t("Home.Header.Menus.aboutUs"),
      path: configs.paths.aboutUs,
    },
    {
      title: t("Home.Header.Menus.news"),
      path: configs.paths.news,
    },
    {
      title: t("Home.Header.Menus.userPolicy"),
      path: configs.paths.userPolicy,
    },
    {
      title: t("Home.Header.Menus.contactUs"),
      path: configs.paths.contactUs,
    },
  ];

  return (
    <div className="wp_header_page">
      <div className="header_left">
        <button className="btn_action">
          <i className="fa-solid fa-bars"></i>
        </button>
        <span className="me-3">Constructor</span>
        <div className="option_links display-flex aligns-item-center">
          {menus.map((menu) => (
            <Link className="menu_links" to={menu.path} key={menu.path}>
              {menu.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="header_right">
        <div className="wp_search">
          <i className="fa-solid fa-magnifying-glass"></i>

          <input
            className="search_input"
            type="text"
            placeholder="Search product or orders"
          />
        </div>

        <div className="user-infor">
          <span className="user-icon">
            <i className="fa-regular fa-user"></i>
          </span>
          <span className="user_name">
            <Link
              onClick={async () => {
                await authService.logout();
              }}
              to="/login"
            >
              Logout
            </Link>
          </span>
        </div>

        <button className="btn_action">
          <i className="fa-solid fa-bell"></i>
        </button>

        <button className="btn_action">
          <i className="fa-solid fa-circle-xmark"></i>
        </button>
      </div>
    </div>
  );
}
