import { ConfigProvider, App } from "antd";
import { BrowserRouter, Route, Routes } from "react-router";
import { useThemeData } from './theme/index';
import Home from "./view/Home";
import { TitleBar } from "./components/TitleBar";

export default function () {
  const { themeData } = useThemeData();
  return (
    <ConfigProvider componentSize={"small"} theme={themeData}>
      <App className="h-full p-0">
        <TitleBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </App>
    </ConfigProvider>
  );
};
