import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './design/main.css';
import 'virtual:uno.css';
import { ThemeProvider } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "./view/Detail";
import Home from "./view/Home";
import Search from "./view/Search";
import Video from "./view/Video";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/video" element={<Video />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);