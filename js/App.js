class App extends Domer {
    _Blocks = [];
    constructor() {
        super();
        this.initializePrison();
    }

    initializePrison() {
        this._Blocks.push(new Block("A1"));
        //this._Blocks.push(new Block("B1"));
    }

    render(html) {
        return html`
        <div>
            ${this._Blocks}
        </div>
        `
    }
}
new App();