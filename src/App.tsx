import { ConfigProvider, App } from "antd";
import { useThemeData } from './theme/index';
import { Outlet } from "react-router-dom";
import JLTitleBar from "./components/JL_TitleBar";
import zhCN from 'antd/locale/zh_CN';
import { DataStatistice } from "./core/util/DataStatistice";
import { DetailType } from "./core/api/api_detail";
import Notify from "./notify/Notify";
import { getDeviceDate } from "./components/Premium/Expire";
import { useCallback, useEffect } from "react";

if (import.meta.env.DEV) {
  new DataStatistice();
}
//详情页面缓存初始化
export const detail_cache: {
  search: string | undefined;
  data: DetailType | undefined;
} = {
  search: undefined,
  data: undefined
};


export default function () {
  const { themeData } = useThemeData();
  const initData = useCallback(() => {
    getDeviceDate();
    globalThis.addEventListener('contextmenu', (e: MouseEvent) => {
      e.preventDefault();
      // debugger
    });
  }, [])
  useEffect(() => {
    initData();
  }, []);
  return (
    <ConfigProvider locale={zhCN} componentSize={"small"} theme={themeData}>
      <App className="h-full p-1">
        <Notify />
        <JLTitleBar />
        <div className="pt-1 main-h">
          <Outlet />
        </div>
      </App>
    </ConfigProvider >
  );
};