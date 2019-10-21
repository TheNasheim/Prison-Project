class Inmate extends Person{
    _idNr = ''
    _sentence = ''

    constructor(firstName, lastName, idNr, time){
        super(firstName, lastName);
        //this._firstName = firstName
        //this._lastName = lastName
        this._idNr = idNr;
        this._sentence = time;
    }


    render(html){
        return html`
            ${this._firstName}<br>
            ${this._lastName}<br>
            ${this._idNr}<br>
            ${this._sentence}<br>    
        `
    }
}