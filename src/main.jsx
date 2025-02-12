import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ✅ REGISTRO DEL SERVICE WORKER PARA PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("✅ Service Worker registrado con éxito:", registration);
      })
      .catch((error) => {
        console.error("❌ Error al registrar Service Worker:", error);
      });
  });
}

// ✅ RENDERIZADO PRINCIPAL DE REACT
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
