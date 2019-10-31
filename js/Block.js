class Block extends Domer {
    _cells = [];
    _blockName = '';
    _appObject = null;
    _selectedCell;
    _workers = [];

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

    addWorker(firstname, lastname, title) {
        if (this._workers.length < 4) {
            this._workers.push(new Worker(firstname, lastname, title, this._workers.length, this));
            this._appObject.changeLastEvent("Worker was added");
        }
        else {
            console.log("hello wtf");
            this._appObject.changeLastEvent("Worker was not added. Too many workers. max 4/Block");
        }
    }

    addInmate(inmate, cell) {
        this._cells[cell - 1].addInmate(inmate);
    }

    getInmate() {
        let index = this._cells.findIndex(x => x._cellNr == 5)
        return this._cells[index];
    }

    delInmate(selCell) {
        let index = this._cells.findIndex(x => x.getCellNr() == selCell.getCellNr());
        this._cells[index] = new Cell(index + 1, this._blockName, this);
    }

    delWorker(selWorker) {
        let index = this._workers.findIndex(x => x.getFirstName() == selWorker.getFirstName());
        //this._workers[index] = null;
        this._workers.splice(index, 1);
        for(let i = 0;i < this._workers.length; i++){
            this._workers[i].setBlockPosition(i);
        }
        return;
    }

    relayCellInfoToApp(e) {
        this._appObject.infoFromCell(e);
    }

    relayWorkerInfoToApp(e) {
        this._appObject.infoFromWorker(e);
    }

    displayWorkers() {
        let strOut = "There are no workers at this block.";
        if (this._workers.length > 0) {
            strOut = "";
            for (let i = 0; i < this._workers.length; i++) {
                console.log(this._workers[i]);
                strOut += `<div id="worker-${i}" class="workers" >${this._workers[i].getFirstName()}<br>${this._workers[i].getLastName()}<p>${this._workers[i].getWorkerTitle()}</p></div>`;
            }
            return strOut;
        }
        else {
            return strOut;
        }
    }

    render(html) {
        return html`
        <section id="block">
        <img src="/Image/Block.jpg" alt=${this._blockName} id="blockImg">
        <div id="txtCenterImg">${this._blockName}</div>
        ${this._cells}
        <div id="workers">
        ${this._workers}
        
        </div>
        </section>
        `
    }
}