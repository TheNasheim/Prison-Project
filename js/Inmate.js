class Inmate extends Person {
    _idNr = ''
    _sentence = ''

    constructor(firstName, lastName, idNr, time) {
        super(firstName, lastName);
        this._idNr = idNr;
        this._sentence = time;
    }

    getIDNr(){
        return this._idNr;
    }

    getSentence(){
        return this._sentence;
    }

    render(html) {
        return html`
            <div>
                ${this._firstName}<br>
                ${this._lastName}<br>
                ${this._idNr}<br>
                ${this._sentence}<br>
            </div>    
        `
    }
}