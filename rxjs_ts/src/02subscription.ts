// import { Observable } from "rxjs/Observable";//old RxJs v5
import { Observable } from "rxjs";// new RxJs v6
import { addItem } from './Utilities'


export const subscriptions = () => {
    //                          create take just one arg which is the definition of subscribe function                   
    var observable = Observable.create(
        // the producer is inside the observerable = cold Observable 
        (observer: any) => {
            try {
                observer.next("This is 1.st value");
                observer.next("This is 2.nd value");
                observer.next("This is 3.rd value");
                var i: number = 0;
                setInterval(() => {
                    observer.next("value gen. by setInterval ..." + ++i)
                }, 2000)

            } catch (error) {
                observer.error(error);
            }
        }
    )
    // .share() the observable will behave like PublishSubjects
    ;

    var observer1 = {
        next: (data: any) => addItem(data , "blue"),
        complete: () => addItem("completed"),
        error: (err: any) => console.log(err)
    }
    var observer2 = {
        next: (data: any) => addItem(data ),
        complete: () => addItem("completed"),
        error: (err: any) => console.log(err)
    }

    var subscription1 = observable.subscribe(observer1);
    var subscription2;

    setTimeout(() => {
        subscription2 = observable.subscribe(observer2)
        //child subscription:
        // In order to unsubscribe subscription2 if subscription1 is unsubscribed
        // But this will not unsubs. subscription1 if subscription2 unsubscibe
        subscription1.add(subscription2)
    }, 1000);


    setTimeout(() => subscription1.unsubscribe(), 5100);

}
