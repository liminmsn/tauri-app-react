import { ConfigProvider, App } from "antd";
import { TitleBar } from "./components/TitleBar";
import { useThemeData } from './theme/index';
export default function () {
  const { themeData } = useThemeData();

  return (
    <ConfigProvider componentSize={"small"} theme={themeData}>
      <App className="h-full p-1">
        <TitleBar />
      </App>
    </ConfigProvider>
  );
};
