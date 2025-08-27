# Tauri + React + TypeScript

这个模板可以帮助你快速开始使用 Tauri、React 和 TypeScript 进行开发，基于 Vite 构建工具。

## 推荐的 IDE 配置

- [VS Code](https://code.visualstudio.com/) + [Tauri 插件](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## 模板特点

- 集成 Tauri 2.x 框架，实现高性能跨平台桌面应用开发
- 基于 React 18 和 TypeScript，提供类型安全的组件化开发体验
- 使用 Vite 作为构建工具，带来极速的热模块替换(HMR)和构建性能
- 预置基础项目结构，包含前后端通信示例和窗口配置

## 快速开始

1. 克隆或下载本模板
2. 安装依赖：`npm install` 或 `yarn install`
3. 启动开发环境：`npm run tauri dev` 或 `yarn tauri dev`
4. 构建生产版本：`npm run tauri build` 或 `yarn tauri build`

## 开发指南

- 前端代码位于 `src` 目录，使用 React + TypeScript 编写
- 后端 Rust 代码位于 `src-tauri` 目录，实现原生功能和系统交互
- 前后端通信通过 Tauri 的 `invoke` API 和 Rust 命令处理函数实现
- 应用配置可在 `src-tauri/tauri.conf.json` 中修改

## 学习资源

- [Tauri 官方文档](https://tauri.app/zh-cn/docs/)
- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [Vite 官方文档](https://vitejs.dev/guide/)

通过这个模板，你可以快速开发出兼具 Web 开发效率和原生应用性能的跨平台桌面应用。