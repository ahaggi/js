// import { Subject } from "rxjs/Subject";//old RxJs v5
// import { BehaviorSubject } from "rxjs/BehaviorSubject";//old RxJs v5
// import { ReplaySubject } from "rxjs/ReplaySubject";//old RxJs v5
// import { AsyncSubject } from "rxjs/AsyncSubject";//old RxJs v5
import { Subject } from "rxjs";// new RxJs v6
import { BehaviorSubject } from "rxjs";// new RxJs v6
import { ReplaySubject } from "rxjs";// new RxJs v6
import { AsyncSubject } from "rxjs";// new RxJs v6
import { addItem } from './Utilities'

// flavours of Subjects
//  1- PublishSubjects Or just Subject
//  2- BehavioutSubjects
//  3- ReplaySubjects
//  4- AsyncSubjects

// 1-PublishSubjects
//   They behave like StreamControllers in dart besides that multiple listeners are allowed
//   The new subcribers/lateSubscribers don't receives any recent dispatched data/item before subscription, if any.

// var subject = new Subject();


//  2- BehavioutSubjects
//   Every new subcriber/lateSubscribers receives the most recent dispatched data/item before subscription, if any.

// var subject = new BehaviorSubject("First"); // For whatever reason we need to send the first elm in the constractur!!  


//  3- ReplaySubjects
//   Every new subcriber/lateSubscribers receives a defined amount of recent dispatched data/items before subscription, if any.
//   Replays data/items (in a configurable bounded or unbounded manner) to current and late Observers.

// var subject = new ReplaySubject(); // unbounded buffer, late subscribers will rcv all dispatched the elm/data before subscription, if any.
// var subject = new ReplaySubject(2); // bounded buffer, late subscribers will rcv the most recent 2 dispatched elems/data before subscription, if any.
var subject = new ReplaySubject(10, 300); // bounded buffer last 10 elms, late subscribers will rcv the most recent  dispatched elems/data in the last 300ms before subscription, if any, with max buffer size = 10.


//  4- AsyncSubjects
//   complete/error func must be called otherwise nothing will be dispatched
//   A Subject that emits ONLY the very last value once the complete/error func is called.
// var subject = new AsyncSubject(); 




export const subjects2 = () => {


    var observer1 = {
        next: (data: any) => addItem("observer1: " + data, "yellow"),
    }

    var observer2 = {
        next: (data: any) => addItem("observer2: " + data),
    }

    subject.subscribe(observer1);

    var i: number = 0;
    setInterval(() => {
        subject.next("value gen. by setInterval ..." + ++i)
    }, 100)

    setTimeout(() => {
        subject.subscribe(observer2);
    }, 500);


    setTimeout(() => {
        subject.complete()
    }, 2000);


}


