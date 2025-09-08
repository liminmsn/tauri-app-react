export class GlobalEvent {
    private static store: EventTarget = new EventTarget();
    on(type: string, call: (detail: any) => void) {
        GlobalEvent.store.addEventListener(type, function (e) {
            e instanceof CustomEvent && call(e.detail);
        });
    }
    send(type: string, detail?: any) {
        const event = new CustomEvent(type, { detail });
        GlobalEvent.store.dispatchEvent(event);
    }
}