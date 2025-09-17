import { ConfigProvider, App } from "antd";
import { useThemeData } from './theme/index';
import { TitleBar } from "./components/Titlebar/TitleBar";
import zhCN from 'antd/locale/zh_CN';
import { Outlet } from "react-router-dom";

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
