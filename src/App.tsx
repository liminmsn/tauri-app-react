import { ConfigProvider, App } from "antd";
import { TitleBar } from "./components/TitleBar";
import { useThemeData } from './theme/index';
import Flow from "./view/Flow";
export default function () {
  const { themeData } = useThemeData();

  return (
    <ConfigProvider componentSize={"small"} theme={themeData}>
      <App className="h-full p-0 rounded-2xl overflow-hidden">
        <TitleBar />
        <Flow />
      </App>
    </ConfigProvider>
  );
};
