class GlobalEvent extends EventTarget {
    constructor() {
        super();
    }
    on(type: string, call: EventListenerOrEventListenerObject) {
        this.addEventListener(type, call)
    }
    send(type: string, detail?: any) {
        const event = new CustomEvent(type, { detail });
        this.dispatchEvent(event);
    }
}