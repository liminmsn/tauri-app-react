import { ConfigProvider, App } from "antd";
import { TitleBar } from "./components/TitleBar";
import { useThemeData } from './theme/index';
import zhCN from "antd/locale/zh_CN";
import Flow from "./view/Flow";
export default function () {
  const { themeData } = useThemeData();


  return (
    <ConfigProvider componentSize={"small"} locale={zhCN} theme={themeData}>
      <App className="h-full overflow-hidden rounded-2xl">
        <TitleBar />
        <Flow />
      </App>
    </ConfigProvider>
  );
};
