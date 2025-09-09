class GlobalEvent {
    private store = new EventTarget();
    constructor(private type: string) { }
    on(call: (detail: any) => void) {
        this.store.addEventListener(this.type, function (e) {
            e instanceof CustomEvent && call(e.detail)
        });
    }
    send(detail:any = null) {
        const event = new CustomEvent(this.type, { detail });
        this.store.dispatchEvent(event);
    }
}