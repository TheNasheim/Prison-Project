class Worker extends Person {
    _workerTitle = '';
    _blockPosition = '';
    _blockObject;

    constructor(firstName, lastName, workerTitle, blockPosition, blockObject) {
        super();
        this._firstName = firstName;
        this._lastName = lastName;
        this._workerTitle = workerTitle;
        this._blockPosition = blockPosition;
        this._blockObject = blockObject;
    }

    getWorkerTitle() {
        return this._workerTitle;
    }

    setBlockPosition(intIn){
        this._blockPosition = intIn;
    }

    onSelectWorker() {
        this._blockObject.relayWorkerInfoToApp(this);
    }

    render(html) {
        return html`
            <div id="worker-${this._blockPosition}" class="workers" click="onSelectWorker">
                ${this._firstName}<br>
                ${this._lastName}<br>
                <p>${this._workerTitle}</p>
            </div>    
        `
    }


}