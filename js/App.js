const APP_STATE_INMATE = 1;
const APP_STATE_WORKER = 2;

class App extends Domer {
    _Blocks = [];
    _selectedBlock = '';
    _selectedCell = '';
    _selectedFullCell = false;
    _selectedSavedCell;
    _showBlocks = '';
    _showCells = '';
    _state = 1;
    _showName = '';
    _showLastName = '';
    _showNumber = '';
    _showTime = '';
    _showBlock = '';
    _showCell = '';
    _lastEvent = '';

    constructor() {
        super();
        this.initializePrison();
    }

    initializePrison() {
        this._Blocks.push(new Block("A1", this));
        this._Blocks.push(new Block("B1", this));
        this.showOptions();
        //this.onFillPrison();
        this._lastEvent = "Prison Initialized";
    }

    onFillPrison() {
        this._Blocks = [];
        this._Blocks.push(new Block("A1", this));
        this._Blocks.push(new Block("B1", this));
        this._Blocks[0].addInmate(new Inmate("Reid", "Voit", "215-268", "3.4 Months"), 1);
        this._Blocks[0].addInmate(new Inmate("Edgar", "Saleem", "215-268", "2 Years"), 2);
        this._Blocks[0].addInmate(new Inmate("Tim", "Leanos", "215-268", "5 Month"), 7);
        this._Blocks[0].addInmate(new Inmate("Jerome", "Creek", "896-156", "2 Months"), 10);
        this._Blocks[0].addInmate(new Inmate("Gerry", "Fuselier", "535-864", "1.7 Years"), 15);
        this._Blocks[0].addInmate(new Inmate("Brenton", "Marti", "321-108", "4 Months"), 18);
        this._Blocks[0].addInmate(new Inmate("Geoffrey", "Rouleau", "386-354", "7 Months"), 20);

        this._Blocks[1].addInmate(new Inmate("Bradford", "Glatt", "215-268", "2.4 Months"), 2);
        this._Blocks[1].addInmate(new Inmate("Hector", "Romberg", "215-268", "6 Years"), 4);
        this._Blocks[1].addInmate(new Inmate("Ricardo", "Bou", "215-268", "4.7 Month"), 5);
        this._Blocks[1].addInmate(new Inmate("Jeremy", "Tuff", "896-156", "2 Months"), 9);
        this._Blocks[1].addInmate(new Inmate("Alvaro", "Halbert", "535-864", "1.6 Years"), 12);
        this._Blocks[1].addInmate(new Inmate("Darrick", "Towle", "321-108", "12 Months"), 17);
        this._Blocks[1].addInmate(new Inmate("Damien", "Linscott", "386-354", "9 Months"), 19);
        this._Blocks[1].addInmate(new Inmate("Efrain", "Elizalde", "386-354", "6 Months"), 20);
        this._lastEvent = "Prison Filled";
    }


    showOptions() {
        this._showBlocks = '';
        for (let i = 0; i < this._Blocks.length; i++) {
            this._showBlocks += `<option value="${i}">${this._Blocks[i].getBlockName()}</option>`
        }

    }

    selectedBlock() {
        if (this._selectedFullCell) {
            let cells = this._Blocks[this._selectedBlock].getCells();
            this._showCells = '';
            for (let i = 0; i < cells.length; i++) {
                if (!cells[i]._bInmate) {
                    this._showCells += `<option value="${cells[i].getCellNr()}">${cells[i].getCellNr()}</option>`
                }
            }
            return this._Blocks[this._selectedBlock];
        }
        else {
            if (this._selectedBlock == "" || this._selectedBlock == null) {
                return;
            } else {
                let cells = this._Blocks[this._selectedBlock].getCells();
                this._showCells = '';
                for (let i = 0; i < cells.length; i++) {
                    this._showCells += `<option value="${cells[i].getCellNr()}">${cells[i].getCellNr()}</option>`
                }
                return this._Blocks[this._selectedBlock];
            }
        }
    }

    infoFromCell(cell) {
        if (this.isInputsFilled() && cell.getIsInmate()) {
            console.log(cell.getIsInmate());
            this._selectedFullCell = true;
        } else if (cell.getIsInmate() && !this._selectedFullCell) {
            let inmate = cell.getInmate();
            this._showName = inmate.getFirstName();
            this._showLastName = inmate.getLastName();
            this._showNumber = inmate.getIDNr();
            this._showTime = inmate.getSentence();
            this._selectedSavedCell = cell;
            this._selectedFullCell = true;
            this._lastEvent = "Inmate selected";
        } else {
            this._selectedCell = cell.getCellNr();
            this._lastEvent = "Empty cell selected";
        }
        //console.log(cell._cellNr)
    }

    onAddInmate() {
        if (this.isInputsFilled()) {
            this._Blocks[this._selectedBlock].addInmate(new Inmate(this._showName, this._showLastName, this._showNumber), this._selectedCell)
            this._lastEvent = "Inmate was added";
        }
    }

    onMoveInmate() {
        let inmate = this._selectedSavedCell._Inmate
        let index = this._Blocks.findIndex(x => x._blockName == this._selectedSavedCell._blockName);
        this._Blocks[index].delInmate(this._selectedSavedCell);
        this._Blocks[this._selectedBlock].addInmate(inmate, this._selectedCell)
        this.onEmptyMoveForm();
        this._lastEvent = "Inmate was moved";
    }

    onRemoveInmate() {
        let index = this._Blocks.findIndex(x => x._blockName == this._selectedSavedCell._blockName);
        this._Blocks[index].delInmate(this._selectedSavedCell);
        this.onEmptyMoveForm();
        this._lastEvent = "Inmate was removed";
    }

    onSelectCell() {
        console.log("selectCellClick");
    }

    onEmptyMoveForm() {
        this._selectedSavedCell = null;
        this._selectedFullCell = false;
        this._showLastName = "";
        this._showName = "";
        this._showNumber = "";
        this._showTime = "";
        this._selectedCell = "";
        this._lastEvent = "Form Emptyed";
    }


    onResetForm() {
        this._selectedSavedCell = null;
        this._selectedFullCell = false;
        this._showLastName = "";
        this._showName = "";
        this._showNumber = "";
        this._showTime = "";
        this._selectedCell = "";
        this._selectedBlock = "";
        this._showCells = "";
        this._lastEvent = "Form Cleared";
    }

    isInputsFilled() {
        if (this._showName == "" || this._showLastName == "" || this._showTime == "" || this._showNumber == "") {
            return false;
        }
        else {
            return true;
        }
    }

    btnAddInmate() {
        if (this._selectedFullCell)
            return "disabled";
        else
            return "";
    }

    btnChangeInmate() {
        if (!this._selectedFullCell)
            return "disabled";
        else
            return "";
    }

    test(){
        console.log("yepp")
    }
    inputReadonly() {
        if (this._selectedFullCell)
            return "readonly";
        else
            return "";
    }
    
        displayOptions() {
            if (this._state == APP_STATE_INMATE) {
                return `
        <input placeholder="FirstName" type="text" id="inputName" bind="_showName" ${this.inputReadonly()}><br>
        <input placeholder="LastName" type="text" id="lastName" bind="_showLastName" ${this.inputReadonly()}><br>
        <input placeholder="Inmate Number" type="text" id="number" bind="_showNumber" ${this.inputReadonly()}><br>
        <input placeholder="Sentenced Time" type="text" id="time" bind="_showTime" keydown="test"><br>

        <label for="myBlocks">Blocks</label>   <label for="myCells">Cells</label><br>
        <select id="myBlocks" size="8" bind="_selectedBlock" >${this._showBlocks}</select>
        <select id="myCells" size="8" bind="_selectedCell" change="onSelectCell" >${this._showCells}</select><br>
        <button type="button" click="onAddInmate" ${this.btnAddInmate()}>Add new Inmate</button>
        <button type="button" click="onMoveInmate" ${this.btnChangeInmate()}>Move Inmate</button>
        <button type="button" click="onResetForm">Cancel</button><br>
        <button type="button" click="onRemoveInmate" ${this.btnChangeInmate()}>Remove Inmate</button>
        <br>
        ${this._lastEvent}
    </form>
            `
            }
        }

    //${this.displayOptions()} 
    render(html) {
        return html` 
    <section>
    <button id="fillPrison" type="button" click="onFillPrison">Fill Prison</button>
    <form class="form">
    <h2>Welcome to Prison Project 0.8</h2>
    ${this.displayOptions()} 
    </form>
    <hr>
    <br>
        ${this.selectedBlock()}
    </section>
    `
    }
}
new App();


