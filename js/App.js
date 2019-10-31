const APP_STATE_INMATE = 1;
const APP_STATE_WORKER = 2;

class App extends Domer {
    _Blocks = [];
    _selectedBlock = '0';
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
        this.selectedBlock();
    }

    onFillPrison() {
        this._Blocks = [];
        this._Blocks.push(new Block("A1", this));
        this._Blocks.push(new Block("B1", this));
        this._Blocks[0].addInmate(new Inmate("Helena", "Barmer", "215-268", "3.4 Months"), 1);
        this._Blocks[0].addInmate(new Inmate("Johan", "Wikström", "215-268", "2 Years"), 2);
        this._Blocks[0].addInmate(new Inmate("Tim", "Leanos", "215-268", "5 Month"), 7);
        this._Blocks[0].addInmate(new Inmate("Sebastian", "Lundgren", "896-156", "2 Months"), 10);
        this._Blocks[0].addInmate(new Inmate("Gerry", "Fuselier", "535-864", "1.7 Years"), 15);
        this._Blocks[0].addInmate(new Inmate("Brenton", "Marti", "321-108", "4 Months"), 18);
        this._Blocks[0].addInmate(new Inmate("Nils", "Jacobsen", "386-354", "7 Months"), 20);
        this._Blocks[0].addWorker("Johan", "Wirén", "Correctional Officer");
        this._Blocks[0].addWorker("Lars", "Something", "Warden");

        this._Blocks[1].addInmate(new Inmate("Bradford", "Glatt", "215-268", "2.4 Months"), 2);
        this._Blocks[1].addInmate(new Inmate("Hector", "Romberg", "215-268", "6 Years"), 4);
        this._Blocks[1].addInmate(new Inmate("Mantas", "Sliazas", "215-268", "4.7 Month"), 5);
        this._Blocks[1].addInmate(new Inmate("Jeremy", "Tuff", "896-156", "2 Months"), 9);
        this._Blocks[1].addInmate(new Inmate("Erik", "Halbert", "535-864", "1.6 Years"), 12);
        this._Blocks[1].addInmate(new Inmate("Darrick", "Towle", "321-108", "12 Months"), 17);
        this._Blocks[1].addInmate(new Inmate("Tobbe", "Linscott", "386-354", "9 Months"), 19);
        this._Blocks[1].addInmate(new Inmate("Hassan", "Abed", "386-354", "1.6 Months"), 20);
        this._Blocks[1].addWorker("Christian", "Nilsson", "Correctional Officer");
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
        if (this._state == APP_STATE_INMATE) {
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
        }
    }

    infoFromWorker(worker) {
        if (this._state == APP_STATE_WORKER) {
            if (this.isInputsFilled() && cell.getIsInmate()) {
                console.log(cell.getIsInmate());
                this._selectedFullCell = true;
            } else if (!this._selectedFullCell) {
                this._showName = worker.getFirstName();
                this._showLastName = worker.getLastName();
                this._showNumber = worker.getWorkerTitle();
                this._selectedSavedCell = worker;
                this._selectedFullCell = true;
                this._lastEvent = "Worker selected";
            } else {

            }
        }
    }

    onChangeState() {
        if (this._state == APP_STATE_INMATE) {
            this._state = APP_STATE_WORKER;
        }
        else {
            this._state = APP_STATE_INMATE;
        }
        
    }

    onAddInmate() {
        if (this.isInputsFilled()) {
            this._Blocks[this._selectedBlock].addInmate(new Inmate(this._showName, this._showLastName, this._showNumber), this._selectedCell);
            this.onEmptyInmateForm();
            this._lastEvent = "Inmate was added";
        }
    }

    onAddWorker() {
        if (this.isInputsFilled()) {
            console.log(this._showName, this._showLastName, this._showNumber);
            this._Blocks[this._selectedBlock].addWorker(this._showName, this._showLastName, this._showNumber);
            this.onEmptyWorkerForm();
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

    onMoveWorker() {
        let index = this._Blocks.findIndex(x => x.getBlockName() == this._selectedSavedCell._blockObject.getBlockName());
        this._Blocks[index].delWorker(this._selectedSavedCell);
        this._Blocks[this._selectedBlock].addWorker(this._selectedSavedCell.getFirstName(), this._selectedSavedCell.getLastName(), this._selectedSavedCell.getWorkerTitle())
        this.onEmptyWorkerForm();
        this._lastEvent = "Worker was moved";
    }

    onRemoveInmate() {
        let index = this._Blocks.findIndex(x => x._blockName == this._selectedSavedCell._blockName);
        this._Blocks[index].delInmate(this._selectedSavedCell);
        this.onEmptyInmateForm();
        this._lastEvent = "Inmate was removed";
    }

    onRemoveWorker() {
        let index = this._Blocks.findIndex(x => x.getBlockName() == this._selectedSavedCell._blockObject.getBlockName());
        this._Blocks[index].delWorker(this._selectedSavedCell);
        this.onEmptyWorkerForm();
        this._lastEvent = "Worker was removed";
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

    onEmptyWorkerForm() {
        this._selectedSavedCell = null;
        this._selectedFullCell = false;
        this._showLastName = "";
        this._showName = "";
        this._showNumber = "";
    }

    onEmptyInmateForm() {
        this._selectedSavedCell = null;
        this._selectedFullCell = false;
        this._showLastName = "";
        this._showName = "";
        this._showNumber = "";
        this._showTime = "";
        this._selectedCell = "";
        this._showCells = "";
    }

    isInputsFilled() {
        if (this._showName == "" || this._showLastName == "" || this._showNumber == "") {
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

    changeLastEvent(textIn) {
        this._lastEvent = textIn;
    }

    btnChangeInmate() {
        if (!this._selectedFullCell)
            return "disabled";
        else
            return "";
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
        <input placeholder="First Name" type="text" id="inputName" bind="_showName" ${this.inputReadonly()}><br>
        <input placeholder="Last Name" type="text" id="lastName" bind="_showLastName" ${this.inputReadonly()}><br>
        <input placeholder="Inmate Number" type="text" id="number" bind="_showNumber" ${this.inputReadonly()}><br>
        <input placeholder="Sentenced Time" type="text" id="time" bind="_showTime" keydown="test"><br>

        <label for="selBlocks">Blocks</label>   <label for="myCells">Cells</label><br>
        <select id="selBlocks" size="8" bind="_selectedBlock" >${this._showBlocks}</select>
        <select id="selCells" size="8" bind="_selectedCell" change="onSelectCell" >${this._showCells}</select><br>

        <button type="button" id="btnChange" click="onChangeState">Change to Workers</button>
        <button type="button" id="btnAdd" click="onAddInmate" ${this.btnAddInmate()}>Add new Inmate</button>
        <button type="button" id="btnMove" click="onMoveInmate" ${this.btnChangeInmate()}>Move Inmate</button>
        <button type="button" id="btnRemove" click="onRemoveInmate" ${this.btnChangeInmate()}>Remove Inmate</button>
        <button type="button" id="btnReset" click="onEmptyInmateForm">Cancel</button><br>
        <br>
            `
        }
        else if (this._state == APP_STATE_WORKER) {
            return `
            <input placeholder="First Name" type="text" id="inputName" bind="_showName" ${this.inputReadonly()}><br>
            <input placeholder="Last Name" type="text" id="lastName" bind="_showLastName" ${this.inputReadonly()}><br>
            <input placeholder="Job Description" type="text" id="number" bind="_showNumber" ${this.inputReadonly()}><br><br>

            <label for="selBlocks">Blocks</label><br>
            <select id="selBlocks" size="8" bind="_selectedBlock" >${this._showBlocks}</select><br>
            <button type="button" id="btnChange2" click="onChangeState" >Change to Inmates</button>
            <button type="button" id="btnAdd" click="onAddWorker" ${this.btnAddInmate()}>Add new Worker</button>
            <button type="button" id="btnMove" click="onMoveWorker" ${this.btnChangeInmate()}>Move Worker</button>
            <button type="button" id="btnRemove" click="onRemoveWorker" ${this.btnChangeInmate()}>Remove Worker</button>
            <button type="button" id="btnReset" click="onEmptyWorkerForm">Cancel</button><br>
                `
        }
    }

    render(html) {
        return html` 
    <section>
        <button id="fillPrison" type="button" click="onFillPrison">Fill Prison</button>
        <form class="form">
            <h2>Welcome to Prison Project 1.0</h2>
            ${this.displayOptions()} 
            ${this._lastEvent}
        </form>
        <hr>
        <br>
        ${this.selectedBlock()}
        <br>
        <br>
        <br>
    </section>
    `
    }
}
new App();