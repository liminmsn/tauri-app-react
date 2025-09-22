import { DetailType } from "../api/api_detail";
import { JLLOG } from "../util/JL_Log";

abstract class JLLocalStorage {
    protected db?: IDBDatabase;
    protected abstract init(db: IDBDatabase): void;
    protected abstract success(): void;
    constructor(name: string) {
        const request = indexedDB.open(name, 1);
        request.onupgradeneeded = (e) => {
            if (e.target instanceof IDBOpenDBRequest) {
                const db = e.target.result;
                JLLOG.success("数据库创建成功!");
                JLLOG.info('数据库名称:' + db.name);
                JLLOG.info('数据库版本:' + db.version);
                this.init(db);
            }
        }
        request.onsuccess = (e) => {
            if (e.target instanceof IDBOpenDBRequest) {
                this.db = e.target.result;
                this.success();
            }
        }
    }
    getAll(storeName: string, call: (data: DetailType[]) => void) {
        if (this.db) {
            const tx = this.db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => {
                call(request.result);
            };
        } else {
            call([]);
        }
    }
    protected add(storeName: string, detail: any) {
        if (this.db) {
            // 创建读写事务
            // console.log(detail);
            const writeTx = this.db.transaction(storeName, 'readwrite');
            const writeStore = writeTx.objectStore(storeName);
            return writeStore.put({ ...detail, time: Date.now() });
        }
    }
    protected delete(storeName: string, key: string) {
        if (this.db) {
            const tx = this.db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            return store.delete(key);
        }
    }
    close() {
        this.db && this.db.close();
    }
}

export class JLHistory extends JLLocalStorage {
    constructor(private call?: (obj: JLHistory) => void) {
        super(JLHistory.name);
    }
    protected success() { this.call && this.call(this) };
    protected init(db: IDBDatabase): void {
        if (!db.objectStoreNames.contains('history')) {
            const objectStore = db.createObjectStore('history', {
                keyPath: 'history_item',
            });
            objectStore.createIndex('byTime', 'time', { unique: true });
        }
    }
    addHistory(detail: DetailType) {
        return this.add('history', { ...detail, time: Date.now() });
    }
    rmAllHistory() {
        if (this.db) {
            const tx = this.db.transaction('history', 'readonly');
            const store = tx.objectStore('history');
            return store.clear();
        }
    }
}

export class JLLovels extends JLLocalStorage {
    constructor(private call?: (obj: JLLovels) => void) {
        super(JLLovels.name);
    }
    protected success() { this.call && this.call(this) };
    protected init(db: IDBDatabase): void {
        if (!db.objectStoreNames.contains('lovels')) {
            const objectStore = db.createObjectStore('lovels', {
                keyPath: 'lovels_item',
            });
            objectStore.createIndex('byTime', 'time', { unique: true });
        }
    }
    delLovel(key: string) {
        return this.delete('lovels', key);
    }
    addLovel(detail: DetailType) {
        return this.add('lovels', { ...detail, time: Date.now() });
    }
}