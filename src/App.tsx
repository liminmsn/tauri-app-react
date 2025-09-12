import { ConfigProvider, App } from "antd";
import { BrowserRouter, Route, Routes } from "react-router";
import { useThemeData } from './theme/index';
import Home from "./view/Home";
import { TitleBar } from "./components/Titlebar/TitleBar";
import zhCN from 'antd/locale/zh_CN';
import Detail from "./view/Detail";

export default function () {
  const { themeData } = useThemeData();

  return (
    <ConfigProvider locale={zhCN} componentSize={"small"} theme={themeData}>
      <App className="h-full p-1">
        <TitleBar />
        <div className="pt-1 main-h">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detail" element={<Detail />} />
            </Routes>
          </BrowserRouter>
        </div>
      </App>
    </ConfigProvider>
  );
};
