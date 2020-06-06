// import 'rxjs/add/observable/interval'; //old RxJs v5
// import 'rxjs/add/operator/map'; //old RxJs v5

import { map, delay } from "rxjs/operators";// new RxJs v6
import { interval, of, from, Observable } from 'rxjs';

const data = [
    { a: 11, b: "12", c: 13 },
    { a: 21, b: "22", c: 23 },
    { a: 31, b: "32", c: 33 },
    { a: 41, b: "42", c: 43 },
];

const addItem = (val: any, bgColor: string = null) => {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
    if (bgColor)
        node.style.background = bgColor;
}

const simulateHttp = (val: any, dly: number) => { // OBS OBS OBS ikke ha param med det samme navn som RxJs operators f. eks delay
    // return Observable.of(val).delay(delay); // old RxJs v5
    // return of(val).pipe(delay(dly));
    return from(data).pipe(delay(dly));
}

const simulateFirebase = (val: any, dly: number) => {
    // return Observable.interval(delay).map(index => val + " " + index); //old RxJs v5
    return interval(dly).pipe(map(index => val + " " + index))
}

export { addItem, simulateFirebase, simulateHttp }

// const getCheckedElement = () => {
//     var elems = <HTMLInputElement[]><any>document.getElementsByName('q');

//     for (let index = 0; index < elems.length; index++) {
//         const element = elems[index];
//         if (element.checked)
//             return element.value
//     }

// }


// var checked = getCheckedElement();
    // switch (checked) {
    //     case 1:
    //         observables1()
    //         break;
    //     case 2:

    //         break;
    //     case 3:

    //         break;

    //     default: var
    //         break;
    // }