export class Dom extends DOMParser {
    public dom: Document;
    constructor(html: string) {
        super()
        this.dom = this.parseFromString(html, 'text/html');
    }
}