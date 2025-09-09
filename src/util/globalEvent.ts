class GlobalEvent {
    private store = new EventTarget();
    on(type: string, call: (detail: any) => void) {
        this.store.addEventListener(type, function (e) {
            e instanceof CustomEvent && call(e.detail)
        });
    }
    send(type: string, detail: any = null) {
        const event = new CustomEvent(type, { detail });
        this.store.dispatchEvent(event);
    }
}