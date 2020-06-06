// import { Observable } from "rxjs/Observable";//old RxJs v5
// import { from } from "rxjs/observable/from";//old RxJs v5
// import { merge } from "rxjs/observable/merge";//old RxJs v5
// import "rxjs/add/operator/pluck";//old RxJs v5
// import "rxjs/add/operator/map";//old RxJs v5

import { Observable, from, merge, concat, of } from "rxjs";// new RxJs v6
import { pluck, timeout, defaultIfEmpty } from "rxjs/operators";// new RxJs v6
import { map } from "rxjs/operators";// new RxJs v6

import { addItem } from './Utilities';


// create take just one arg which is the definition of subscribe function                   
var observable1 = Observable.create(
    // the producer is inside the observerable = cold Observable 
    (observer: any) => {
        var i: number = 0;
        setInterval(() => {
            observer.next("observable1:  value gen. by setInterval ..." + ++i)
        }, 1000);
        setTimeout(() => {
            observer.complete()
        }, 5000);
    });

var observable2 = Observable.create(
    // the producer is inside the observerable = cold Observable 
    (observer: any) => {
        var i: number = 500;
        setInterval(() => {
            i += 2;
            observer.next("observable2:  value gen. by setInterval ..." + i)
        }, 1000)
    }
);

var observer = {
    next: (data: any) => addItem(data),
    complete: () => addItem("completed"),
    error: (err: any) => console.log(err)
}

/********************************************************** */

export const operators_merge = () => {

    var mergedObservable = merge(observable1, observable2);
    var subscription =
        mergedObservable
            // .map((data: any) => data.toUpperCase())  //old RxJs v5
            .pipe(
                map((data: any) => data.toUpperCase())
            )
            .subscribe(observer)

    setTimeout(() => {
        subscription.unsubscribe()
    }, 10000);
}

/********************************************************** */

export const operators_concat = () => { //Observer1 HAS to complete before we can receive values of ovbserver2

    var mergedObservable = concat(observable1, observable2);
    var subscription =
        mergedObservable
            // .map((data: any) => data.toUpperCase())  //old RxJs v5
            .pipe(
                map((data: any) => data.toUpperCase())
            )
            .subscribe(observer)

    setTimeout(() => {
        subscription.unsubscribe()
    }, 10000);
}

/********************************************************** */
const data = [
    { a: 11, b: "12", c: 13 },
    { a: 21, b: "22", c: 23 },
    { a: 31, b: "32", c: 33 },
    { a: 41, b: "42", c: 43 },
];

export const operatorsPluck = () => {

    var observable1 = from(data)
        // .pluck('b') // old RxJs v5
        .pipe(
            pluck('b')
        );

    observable1.subscribe((val: any) => addItem(val))
}


// const getDataFromServer = () => {
//     const http1$ = simulateHttp("1", 1000);
//     http1$.pipe(
//         pluck('b')
//     ).subscribe(
//         console.log,
//         console.error,
//         () => console.log('http1$ completed')
//     );
// }

/********************************************************** */


export const operators_defaultIfEmpty = () => {

    var observable = Observable.create(
        // the producer is inside the observerable = cold Observable 
        (observer: any) => {
            try {
                observer.next("observable_with_values: This is 1.st value");
                observer.next("observable_with_values: This is 2.nd value");
                observer.next("observable_with_values: This is 3.rd value");
                observer.complete()
            } catch (error) {
                observer.error(error);
            }
        }
    );

    var observable_witch_completes = Observable.create(
        (observer: any) => {
            try {
                observer.complete()
            } catch (error) {
                observer.error(error);
            }
        }
    );

    var observable_witch_doesnot_completes = Observable.create(
        (observer: any) => {
            try {

            } catch (error) {
                observer.error(error);
            }
        }
    );

    var observer = {
        next: (data: any) => addItem(data),
        complete: () => addItem("completed"),
        error: (err: any) => console.log(err)
    }

    observable.subscribe(observer);

    var _milsec = 3000;
    setTimeout(() => {
        observable_witch_completes.pipe(defaultIfEmpty("observable_witch_completes: This is the default value")).subscribe(observer);
    } , _milsec);


    setTimeout(() => {
        observable_witch_doesnot_completes.pipe(
                // this will Not emit any value, becuase the "observable_witch_doesnot_completes", does not have "observer.complete()"
                defaultIfEmpty("observable_witch_doesnot_completes: This is the default value")).subscribe(observer);
    } , 2*_milsec);

    setTimeout(() => {
        of().pipe(defaultIfEmpty("observable created with 'of': This is the default value")).subscribe(observer);
    } , 3*_milsec);

}