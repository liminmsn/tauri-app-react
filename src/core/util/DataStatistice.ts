//百度数据统计
export class DataStatistice {
    static I: DataStatistice;
    private url: string = import.meta.env['VITE_BAIDU_TONGJI'];
    private key: string = String('/hm.js?').concat(import.meta.env['VITE_BAIDU_TONGJI_KEY']);
    constructor() {
        if (DataStatistice.I == null) {
            DataStatistice.I = this;
        }
        if (import.meta.env.DEV) this.url = import.meta.env['VITE_BAIDU_TONGJI_PROXY'];
        this.init();
    }
    init() {
        //@ts-ignore
        if (globalThis['_hmt'] == undefined) {
            //@ts-ignore
            globalThis['_hmt'] = [];
            const hm = document.createElement('script');
            hm.src = this.url.concat(this.key);
            hm.crossOrigin = 'anonymous';
            hm.referrerPolicy = 'no-referrer-when-downgrade';
            const s = document.getElementsByTagName("script")[0];
            s.parentNode?.insertBefore(hm, s);
        }
        //@ts-ignore
        return globalThis['_hmt'] as unknown as Array<any>;
    }

    /**
     * 上报页面访问（单页应用路由切换时调用）
     * @param pagePath 页面路径（需以 / 开头，如 /home、/settings）
     * @param pageTitle 页面标题（可选，如“首页”）
     */
    trackPageView(pagePath: string, pageTitle?: string): void {
        if (!_hmt) return;
        // 百度统计要求页面路径以 / 开头，避免格式错误
        const validPath = pagePath.startsWith("/") ? pagePath : `/${pagePath}`;
        _hmt.push(["_trackPageview", validPath, pageTitle]);
    };

    /**
     * 上报用户行为事件（按钮点击、功能触发等）
     * @param category 事件类别（如“用户操作”“按钮点击”）
     * @param action 事件动作（如“点击”“保存”）
     * @param label 事件标签（可选，区分同类别下的不同场景，如“登录按钮”）
     * @param value 事件值（可选，需为数字，如统计点击次数）
     */
    trackEvent(
        category: string,
        action: string,
        label?: string,
        value?: number
    ) {
        if (!_hmt) return;
        const eventArr = ["_trackEvent", category, action];
        // 可选参数拼接（确保格式正确）
        if (label) eventArr.push(label);
        if (value !== undefined && !isNaN(value)) eventArr.push(String(value));
        _hmt.push(eventArr);
    };
}