/// <reference types="vite/client" />
interface Window {
    // _hmt 是百度统计的全局数组，用于存储上报事件
    _hmt?: Array<
        | ['_trackPageview', string, string?]  // 页面上报参数类型
        | ['_trackEvent', string, string, string?, number?]  // 事件上报参数类型
        | any[]  // 兼容其他可能的参数格式
    >;
}

// 若需要在非 window 上下文直接访问 _hmt，可声明为全局变量
declare const _hmt: Window['_hmt'];