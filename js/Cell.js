class Cell extends Domer {
    _cellNr = '';
    _blockName = '';
    _bInmate = false;
    _Inmate;
    _blockObject = null;

    constructor(cellNr, blockName, blockObject) {
        super();
        this._cellNr = cellNr;
        this._blockName = blockName ;
        this._blockObject = blockObject;
    }

    addInmate(inmate) {
        if (!this._bInmate) {
            this._Inmate = inmate;
            this._bInmate = true;
        }
    }

    removeInmate() {
        if (this._bInmate) {
            this._Inmate = null;
            this._bInmate = false;
        }
    }
    getIsInmate(){
        return this._bInmate;
    }
    getCellNr(){
        return this._cellNr;
    }
    getInmate(){
        return this._Inmate;
    }
    onSelectInmate() {
        this._blockObject.relayInfoToApp(this);
    }

    render(html) {
        return html`<div>
            <section id="cell-${this._cellNr}" class="cells" click="onSelectInmate" style=${this._bInmate ? "background-color:darkred" : "background-color:darkgreen"}>${this._bInmate ? this._Inmate : ""}</section>
        </div>
    
    `
    }
}

//<div id="${this._cellNr}">John Doe<br>120-546<br>5 Month</div>