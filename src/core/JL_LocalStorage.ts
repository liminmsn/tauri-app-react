import { DetailType } from "./api/api_detail";

abstract class JLLocalStorage {
    private store: any;
    protected abstract data: any;
    constructor() {
        this.init();
    }
    async init() {
        const res = await indexedDB.databases();
        console.log(res);
    }
    protected get(key: string) {
        // return this.store.getItem(key);
    }
    protected add(key: string, val: string) {
        console.log(this.store);

        // this.store.setItem(key, val);
    }
    save(key: string) {
        this.add(key, JSON.stringify(this.data));
    }
}

export class JLHistory extends JLLocalStorage {
    protected data: Map<string, DetailType> = new Map();
    constructor() {
        super();

        const obj = this.get(JLHistory.name);
        if (obj == null) {
            this.save(JLHistory.name);
        } else {
            this.data = new Map(Object.entries(JSON.parse(obj)));
        }
    }
    addHistory(detail: DetailType) {
        this.data.set(Date.now().toString(), detail);
        return this;
    }
    rmHistory(time: string) {
        this.data.delete(time);
        return this;
    }
}