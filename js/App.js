class App extends Domer {
    _Blocks = [];
    _selectedBlock = 0;
    constructor() {
        super();
        this.initializePrison();
    }

    initializePrison() {
        this._Blocks.push(new Block("A1"));
        this._Blocks.push(new Block("B1"));
        this._Blocks[0].addInmate(new Inmate("John", "Doe", "215-268", "5 Month"), 1);
    }

    showBlock() {
        if (this._selectedBlock >= 0 || this._selectedBlock <= this._Blocks.length) {
            return this._Blocks[this._selectedBlock];
        }
        else {
            return ;
        }
    }


    render(html) {
        return html`
        <div><br>
        <br> orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <br>
        tempor incididunt ut labore et dolore magna aliqua. <br>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br>
         Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br>
        <br><br><br><hr>
        <br>
            ${this.showBlock()}
        </div>
        `
    }
}
new App();


