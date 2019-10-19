class Cell extends Domer {
    _cellNr = '';

    constructor(cellNr) {
        super();
        this._cellNr = `cell-${cellNr}`;
    }

    render(html) {
        return html`
    <section>
        <div id="${this._cellNr}">hello</div>
    </section>
    `
    }
}