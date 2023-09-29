import React, { useState } from "react";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import i18n from "../../i18n";
import "./style.scss";
export default function Header(props) {
  const [lng, setlng] = useState("en");
  const name = localStorage.getItem("name");
  const avatar = localStorage.getItem("avatar");

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    setlng(language);
  };

  return (
    <div className="header">
      <div className="d-flex justify-content-between align-items-center py-4 px-3 flex-wrap content">
        <h2 className="mb-0">{props.title}</h2>
        <div className="d-flex gap-2 align-items-center">
          <div className="d-flex toggle-group align-items-center justify-content-end gap-3">
            <div className="toggle-theme" onClick={props.handleDarkTheme}>
              {props.darkTheme ? (
                <MdLightMode className="icons" />
              ) : (
                <MdDarkMode className="icons" />
              )}
            </div>
            <div className="toggle-language d-flex gap-2">
              <span
                onClick={() => handleChangeLanguage("en")}
                className={lng === "en" ? "active" : ""}
              >
                EN
              </span>
              <span
                onClick={() => handleChangeLanguage("id")}
                className={lng === "id" ? "active" : ""}
              >
                ID
              </span>
            </div>
          </div>
          <div className="divider" />
          <p className="mb-0">{name}</p>
          <img
            src={avatar}
            alt={avatar}
            width="32px"
            height="32px"
            className="rounded-circle"
          />
        </div>
      </div>
    </div>
  );
}
