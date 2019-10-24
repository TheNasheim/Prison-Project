class Block extends Domer {
    _cells = [];
    _blockName = '';
    _appObject = null;
    _selectedCell;

    constructor(blockName, appObject) {
        super();
        this._blockName = blockName;
        this._appObject = appObject;
        this.createCells();
    }

    createCells() {
        for (let i = 1; i < 21; i++) {
            this._cells.push(new Cell(i, this._blockName, this));
        }

    }

    getBlockName() {
        return this._blockName;
    }

    getCells() {
        return this._cells;
    }

    addInmate(inmate, cell) {
        this._cells[cell - 1].addInmate(inmate);
    }

    getInmate() {
        let index = this._cells.findIndex(x => x._cellNr == 5)
        return this._cells[index];
    }

    delInmate(selCell) {
        let index = this._cells.findIndex(x => x._cellNr == selCell._cellNr);
        this._cells[index] = new Cell(index + 1, this._blockName, this);
    }

    relayInfoToApp(e) {
        this._appObject.infoFromCell(e);
    }

    render(html) {
        return html`
        <section id="block">
        <img src="/Image/Block.jpg" alt=${this._blockName} id="blockImg">
        <div id="txtCenterImg">${this._blockName}</div>
        ${this._cells}
        </section>
        `
    }

}