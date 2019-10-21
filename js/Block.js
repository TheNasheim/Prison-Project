class Block extends Domer {
    _cells = [];
    _blockName = '';
    constructor(blockName) {
        super();
        this._blockName = blockName;
        this.createCells();
    }

    createCells() {
        for (let i = 1; i < 21; i++) {
            this._cells.push(new Cell(i));
        }
        //this._cells[0].addInmate();
        
    }

    addInmate(inmate, cell){
        this._cells[cell-1].addInmate(inmate);
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