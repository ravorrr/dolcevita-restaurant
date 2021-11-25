'use strict';

// OOP (ang. object-oriented programming) - Programowanie obiektowe
// OOP - ES6 (stąd się wzięło)
class Cookies {
    //metoda wbudowana
    constructor() {
        // właściwość
        this.name = 'Patryk';
        console.log('To ja konstruktor');
    }
    // nasza metoda
    myFunction() {
        console.log('To jest nasza metoda');
    }

    sayHello() {
        console.log(`cześć, tu ${this.name}`);
    }
}

// Tworzę instancję klasy Cookies
const cookie = new Cookies;

cookie.myFunction();
cookie.sayHello();