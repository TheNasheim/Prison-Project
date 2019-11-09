class Person extends Domer {
    _firstName = ''
    _lastName = ''

    constructor(firstName, lastName){
        super();
        this._firstName = firstName;
        this._lastName = lastName;
    }
    getFirstName() {
        return this._firstName;
    }

    getLastName() {
        return this._lastName;
    }
}