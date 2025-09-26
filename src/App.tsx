import { ConfigProvider, App } from "antd";
import { useThemeData } from './theme/index';
import { TitleBar } from "./components/Titlebar/TitleBar";
import { Outlet } from "react-router-dom";
import zhCN from 'antd/locale/zh_CN';
import { DataStatistice } from "./core/util/DataStatistice";

new DataStatistice();
export default function () {
  const { themeData } = useThemeData();

  return (
    <ConfigProvider locale={zhCN} componentSize={"small"} theme={themeData}>
      <App className="h-full p-1">
        <TitleBar />
        <div className="pt-1 main-h">
          <Outlet />
        </div>
      </App>
    </ConfigProvider >
  );
};


globalThis.addEventListener('contextmenu', (e: MouseEvent) => {
  e.preventDefault();
  // debugger
});