import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './design/main.css';
import 'virtual:uno.css';
import { ThemeProvider } from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

globalThis.addEventListener('contextmenu', (e: MouseEvent) => {
  e.preventDefault();
  // debugger
});