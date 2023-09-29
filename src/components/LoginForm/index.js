import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Button } from "react-bootstrap";
import iconVisibilityOn from "../../assets/images/icons/icon-visibilityOn.svg";
import iconVisibilityOff from "../../assets/images/icons/icon-visibilityOff.svg";
import "./style.scss";
export default function LoginForm(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => setShowPassword(!showPassword);

  const disabled = props.email === "" || props.password === "" || props.password.length < 8;
  const { t } = useTranslation();
  return (
    <Form onSubmit={props.onSubmit} className="login-form mb-4">
      <Form.Group className="mb-2 form-group" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder={t("Email Address")}
          onChange={props.handleChange}
          value={props.email}
          required
        />
      </Form.Group>
      <Form.Group className="mb-4 form-group" controlId="formBasicPassword">
        <div className="d-flex justify-content-between align-items-center">
          <Form.Label>Password</Form.Label>
          <p className="forgot-password mb-0">{t("Forgot Password?")}</p>
        </div>
        <div className="d-flex align-items-center">
          <Form.Control
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder={t("Password")}
            onChange={props.handleChange}
            value={props.password}
            required
          />
          <span onClick={handleShow}>
            {showPassword ? (
              <img src={iconVisibilityOn} alt={iconVisibilityOn} className="toggle-show-password"/>
            ) : (
              <img src={iconVisibilityOff} alt={iconVisibilityOff} className="toggle-show-password"/>
            )}
          </span>
        </div>
        {props.password.length >= 8 ? (
          ""
        ) : (
          <p className="invalid">{t("Password must be at least 8 characters")}</p>
        )}
      </Form.Group>
      <Button type="submit" disabled={disabled} size="lg">
      {t("Login")}
      </Button>
    </Form>
  );
}
