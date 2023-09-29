import React, { useState } from "react";
import LogoImage from "../../assets/images/logo_images.png";
import { AiFillPieChart } from "react-icons/ai";
import { FaTicketAlt } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaUserTie } from "react-icons/fa";
import { BiSolidBook } from "react-icons/bi";
import { AiTwotoneSetting } from "react-icons/ai";
import { PiMedalFill } from "react-icons/pi";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidLogOut } from "react-icons/bi";
import "./style.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const role = localStorage.getItem("role");
  const getLinkClass = (path) => {
    return window.location.pathname === path ? " active" : "";
  };
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const {t} = useTranslation()
  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };
  return (
    <div>
      <div
        className={
          sidebar ? "toggle-open py-4 px-2 active" : "toggle-open py-4 px-2"
        }
        style={{ display: "none" }}
        onClick={showSidebar}
      >
        <FiMenu />
      </div>
      <div className={sidebar ? "sidebar active" : "sidebar"}>
        <div className="logo d-flex align-items-center gap-2 mb-3 p-4">
          <img src={LogoImage} alt={LogoImage} width="32px" height="32px" />
          <h3 className="mb-0">Dashboard Kit</h3>
          <div
            className={
              sidebar ? "toggle-close py-4 px-2 active" : "toggle-open py-4 px-2"
            }
            style={{ display: "none" }}
            onClick={showSidebar}
          >
            <AiOutlineClose />
          </div>
        </div>
        {role === "admin" && (
          <div className="sidebar-content mb-4">
            <Link
              className={
                "d-flex align-items-center gap-2 sidebar-content-item py-3 px-4" +
                getLinkClass("/overview")
              }
              to={"/overview"}
            >
              <AiFillPieChart className="icons" />
              <p className="mb-0">{t("Overview")}</p>
            </Link>
            <Link
              className={
                "d-flex align-items-center gap-2 sidebar-content-item py-3 px-4" +
                getLinkClass("/tickets")
              }
              to={"/tickets"}
            >
              <FaTicketAlt className="icons" />
              <p className="mb-0">{t("Tickets")}</p>
            </Link>
            <Link className="d-flex align-items-center gap-2 sidebar-content-item py-3 px-4">
              <FaLightbulb className="icons" />
              <p className="mb-0">{t("Ideas")}</p>
            </Link>
            <Link className="d-flex align-items-center gap-2 sidebar-content-item py-3 px-4">
              <HiMiniUserGroup className="icons" />
              <p className="mb-0">{t("Contacts")}</p>
            </Link>
            <Link className="d-flex align-items-center gap-2 sidebar-content-item py-3 px-4">
              <FaUserTie className="icons" />
              <p className="mb-0">{t("Agents")}</p>
            </Link>
            <Link className="d-flex align-items-center gap-2 sidebar-content-item py-3 px-4">
              <BiSolidBook className="icons" />
              <p className="mb-0">{t("Articles")}</p>
            </Link>
          </div>
        )}
        {role === "guest" && (
          <div className="sidebar-content mb-4">
            <Link className="d-flex align-items-center gap-2 sidebar-content-item py-3 px-4">
              <FaTicketAlt className="icons" />
              <p className="mb-0">Tickets</p>
            </Link>
          </div>
        )}
        <div className="divider" />
        <div className="sidebar-content-2 mt-2">
          <Link className="d-flex align-items-center gap-2 sidebar-content-item py-3 px-4">
            <AiTwotoneSetting className="icons" />
            <p className="mb-0">{t("Settings")}</p>
          </Link>
          <Link className="d-flex align-items-center gap-2 sidebar-content-item py-3 px-4">
            <PiMedalFill className="icons" />
            <p className="mb-0">{t("Subscription")}</p>
          </Link>
          <Link className="d-flex align-items-center gap-2 sidebar-content-item py-3 px-4" onClick={logout}>
            <BiSolidLogOut className="icons" />
            <p className="mb-0">{t("Logout")}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
