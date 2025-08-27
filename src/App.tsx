import { ConfigProvider, App } from "antd";
import { TitleBar } from "./components/TitleBar";
import { useThemeData } from './theme/index';
import Home from "./view/Home";
export default function () {
  const { themeData } = useThemeData();

  return (
    <ConfigProvider componentSize={"small"} theme={themeData}>
      <App className="h-full p-0">
        <TitleBar />
        <Home />
      </App>
    </ConfigProvider>
  );
};
