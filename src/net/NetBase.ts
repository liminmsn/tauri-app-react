import { ClientOptions, fetch } from '@tauri-apps/plugin-http'
class NetBase {
    private url: string = import.meta.env['VITE_URL'];
    private init: (RequestInit & ClientOptions) = {};
    constructor(src: string = '') {
        this.url = this.url.concat(src);
    }
    get() {
        this.init.method = 'GET';
        return this;
    }
    post(body: BodyInit) {
        this.init.method = 'POST';
        this.init.body = body;
        return this;
    }
    async send() {
        const res = await fetch(this.url, this.init);
        return globalThis.caches.open('v1')
            .then(cache => {
                cache.put(this.url, res.clone()); // 缓存响应
                return res; // 返回原始响应供页面使用
            });
    }

}

export { NetBase }
