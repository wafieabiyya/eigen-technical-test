import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import NewsDetail from "./pages/NewsDetail";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/article/:index" element={<NewsDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
