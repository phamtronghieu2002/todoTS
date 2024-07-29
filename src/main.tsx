import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./configs/styles/globalstyle.scss";
import "./i18n/i18n.ts";
import I18nProvider from "./providers/I18nProvider.tsx";
import AuthProvider from "./providers/AuthProvider.tsx";
import TaskProvider from "./providers/TaskProvider.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nProvider>
      <AuthProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </AuthProvider>
    </I18nProvider>
  </React.StrictMode>
);
