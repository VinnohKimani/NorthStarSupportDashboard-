import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import OrderStatus from "./pages/OrderStatus";
import StockAvailability from "./pages/StockAvailability";
import NotFound from "./pages/NotFound";

import "./index.css";

// This is the entry point of the whole app.
// <BrowserRouter> switches which page shows based on the URL, without reloading.
// <App> is the shared shell (nav bar + footer); the nested <Route>s render inside it.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="order-status" element={<OrderStatus />} />
          <Route path="stock" element={<StockAvailability />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
