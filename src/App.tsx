import { ConfigProvider, App } from "antd";
import { BrowserRouter, Route, Routes } from "react-router";
import { useThemeData } from './theme/index';
import Home from "./view/Home";
import { TitleBar } from "./components/Titlebar/TitleBar";

export default function () {
  const { themeData } = useThemeData();

  return (
    <ConfigProvider componentSize={"small"} theme={themeData}>
      <App className="h-full p-1">
        <TitleBar />
        <div style={{ height: 'calc(100% - 25px)' }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </div>
      </App>
    </ConfigProvider>
  );
};
