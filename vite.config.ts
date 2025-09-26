import { defineConfig, ConfigEnv, UserConfigFnPromise, UserConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from 'unocss/vite'

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;
export default defineConfig(async (env: ConfigEnv) => {

  const config: UserConfig = {
    plugins: [react(), UnoCSS()],
    clearScreen: false,
    server: {
      port: 1420,
      strictPort: true,
      host: host || false,
      hmr: host
        ? {
          protocol: "ws",
          host,
          port: 1421,
        }
        : undefined,
      watch: {
        ignored: ["**/src-tauri/**"],
      },
    },
  }
  //代理地址
  if (env.mode == 'development') {
    // @ts-expect-error process is a nodejs global
    const env = loadEnv('', process.cwd(), 'VITE_') as unknown as ViteEnv;
    const url = env['VITE_BAIDU_TONGJI_PROXY'];
    config.server.proxy = {
      [url]: {
        target: env['VITE_BAIDU_TONGJI'],
        changeOrigin: true,
      }
    }
  }

  return config;
});