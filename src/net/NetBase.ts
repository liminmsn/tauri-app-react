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
    async then() {
        console.log(this.url);
        return fetch(this.url, this.init);
    }
}

export { NetBase }