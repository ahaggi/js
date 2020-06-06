// import { Observable } from "rxjs/Observable";//old RxJs v5
import { Observable } from "rxjs";// new RxJs v6
import { addItem } from './Utilities'


export const observables1 = () => {
    //                          create take just one arg which is the definition of subscribe function                   
    var observable = Observable.create(
        // the producer is inside the observerable = cold Observable 
        (observer: any) => {
            try {
                observer.next("This is 1.st value");
                observer.next("This is 2.nd value");
                observer.next("This is 3.rd value");
                observer.complete()
                observer.next("This value will not be emitted");
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
}
