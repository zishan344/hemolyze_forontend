import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BloodDataProvider } from "./context/BloodDataContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BloodDataProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BloodDataProvider>
    </AuthProvider>
  </StrictMode>
);
