import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import Tickets from "./pages/Tickets";
export default function App() {
  return (
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/overview" Component={Overview} />
      <Route path="/tickets" Component={Tickets} />
    </Routes>
  );
}
