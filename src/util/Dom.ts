export class Dom extends DOMParser {
    public dom: Document;
    constructor(html: string) {
        super()
        this.dom = this.parseFromString(html, 'text/html');
    }
    getTag() {
        const liArr = Array.from(this.dom.getElementsByTagName('ul')[0].children[0].children[1].children);
        return liArr.map(li => { return { tag: li.textContent,src:li.children[0].getAttribute('href') ?? ''} });
    }
}