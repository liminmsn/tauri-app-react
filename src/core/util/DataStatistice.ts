//百度数据统计
export class DataStatistice {
    static I: DataStatistice;
    private url: string = import.meta.env['VITE_BAIDU_TONGJI'];
    private key: string = String('/hm.js?').concat(import.meta.env['VITE_BAIDU_TONGJI_KEY']);
    constructor() {
        if (import.meta.env.DEV) this.url = import.meta.env['VITE_BAIDU_TONGJI_PROXY'];
        if (DataStatistice.I == null) {
            this.init();
            DataStatistice.I = this;
        }
    }
    init() {
        //@ts-ignore
        if (globalThis['url_'] == undefined) {
            debugger
            //@ts-ignore
            globalThis['url_'] = [];
            const hm = document.createElement('script');
            hm.src = this.url.concat(this.key);
            hm.crossOrigin = 'anonymous';
            hm.referrerPolicy = 'no-referrer-when-downgrade';
            const s = document.getElementsByTagName("script")[0];
            s.parentNode?.insertBefore(hm, s);
        }
        //@ts-ignore
        return globalThis['url_'] as unknown as Array<any>;
    }
}