import { ConfigProvider, App, FloatButton } from "antd";
import { useThemeData } from './theme/index';
import { TitleBar } from "./components/Titlebar/TitleBar";
import { Outlet } from "react-router-dom";
import zhCN from 'antd/locale/zh_CN';

export default function () {
  const { themeData } = useThemeData();

  return (
    <ConfigProvider locale={zhCN} componentSize={"small"} theme={themeData}>
      <App className="h-full p-1">
        <TitleBar />
        <div className="pt-1 main-h">
          <Outlet />
          <FloatButton.Group shape="square" style={{ insetInlineEnd: 10, insetBlockEnd: 10 }}>
            <FloatButton.BackTop visibilityHeight={0} type="primary" />
          </FloatButton.Group>
        </div>
      </App>
    </ConfigProvider >
  );
};


globalThis.addEventListener('contextmenu', (e: MouseEvent) => {
  e.preventDefault();
  // debugger
});