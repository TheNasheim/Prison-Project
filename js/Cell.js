class Cell extends Domer {
    _cellNr = '';
    _bInmate = false;
    _Inmate;

    constructor(cellNr) {
        super();
        this._cellNr = `cell-${cellNr}`;
    }

    addInmate(inmate){
        if(!this._bInmate){
            this._Inmate = inmate;
            this._bInmate = true;
        }
    }

    removeInmate(){
        if(this._bInmate){
            this._Inmate = null;
            this._bInmate = false;
        }
    }
    
    onSelectInmate(){

    }

    render(html) {
        return html`
        <div id="${this._cellNr}" class="cells" click="onSelectInmate" style=${this._bInmate ? "background-color:darkred" : "background-color:darkgreen"}>${this._bInmate ? this._Inmate : ""}</div>
        
    
    `
    }
}

//<div id="${this._cellNr}">John Doe<br>120-546<br>5 Month</div>