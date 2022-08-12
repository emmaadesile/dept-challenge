import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "../pages/home";

export default function AppRoutes(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
