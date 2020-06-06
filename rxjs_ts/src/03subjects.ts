// import { Subject } from "rxjs/Subject";//old RxJs v5
import { Subject } from "rxjs";// new RxJs v6
import { addItem } from './Utilities'



export const subjects = () => {

    var subject = new Subject();

    var observer1 = {
        next: (data: any) => addItem("observer1: " + data  , "yellow"),
    }

    var observer2 = {
        next: (data: any) => addItem("observer2: " + data ),
    }

    subject.subscribe(observer1);

    subject.next("This is 1.st value");
    subject.next("This is 2.nd value");
    var subscription2 =  subject.subscribe(observer2);
    subject.next("This is 3.rd value");

    var i: number = 0;

    setInterval(() => {
        subject.next("value gen. by setInterval ..." + ++i)
    }, 2000)

    subscription2.unsubscribe();

}


