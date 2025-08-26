import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider, App, theme, ThemeConfig } from "antd";
import Context from "./App";


const defaultData: ThemeConfig = {
  token: {
    borderRadius: 6,
    colorPrimary: '#1677ff',
  },
  components: {
    Button: {
      colorPrimary: '#00B96B',
    },
  }
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={defaultData}>
      <App>
        <Context />
      </App>
    </ConfigProvider>
  </React.StrictMode>,
);
