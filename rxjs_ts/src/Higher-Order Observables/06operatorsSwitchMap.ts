
import { simulateHttp, simulateFirebase } from '../Utilities'
import { switchMap, tap } from "rxjs/operators";// new RxJs v6
import { addItem } from '../Utilities';


/***************************************************************************************************** */
/****************************** switchMap( mappingFunc , selectorFunc ) ****************************** */
/******************************    sourceObsvable  =  outerObservable   ****************************** */
/******************************   resultObservable  =  innerObservable  ****************************** */
/***************************************************************************************************** */

/**
 * The outerObservable$ HTTP observable is said to be the outer observable, we will not subscribe to outerObservable with ".subscribe()"
 * if we don't subscribe to the innerObsvble$, nothing will happen.
 * if we subscribe to the innerObsvble$, that will trigger a subscription to the outerObservable$.
 * once subscribing to the innerobsvable$, then the outerObservable$.pipe(switchMap ..will be executed
 * which will emit outerObservable$ value to arg-func.
 * that function needs to return an Observable, that might be built using the outerObservable$ value "dataOuterObsv" or not
 * that returned observable is said to be the inner observable.
 * when the innerObsvble$ completes, the outerObservable$ also completes.
 * Finally we will return to innerObsvble$.subscribe(..)
 */
const switchMap1 = () => {

    // We will not subscribe to outerObservable$ 
    const outerObservable$ = simulateHttp("/items/1", 1000);

    const innerObsvble$ = outerObservable$.pipe(
        switchMap(
            // this'll work as observer.next() functionality + Map()
            (dataOuterObsv) => {
                console.log("1- This is inside switchMap");
                console.log("2- The data from outerObservable$ be consumed here ");
                return simulateHttp("/items/1", 1000);


            }))

    // subscribing to innerobsvble$ will trigger subscribtion to outerObservable$ 
    innerObsvble$.subscribe(
        (data) => console.log(`Data form the innerObsvable ${JSON.stringify(data)}`),
        console.error,
        () => console.log('completed innerObsvble$')
    )
}


// Just like the above example the subscription's flow is the same
// if we subscribe to the innerObsvble$, that will ... read the previous example's comment 
//       +
// But in this example, we can see more obviously how switchMap works  
// - The outerObsv_firebase$ emits 1. value
//      - The innerObsv_firebase$ emits 1. value
//      - The innerObsv_firebase$ emits 2. value
//      - The innerObsv_firebase$ emits values until it's completed/err     OR
// - The outerObsv_firebase$ emits 2. value , 
//   the mapping function is called again, which will discard the old innerObsv_firebase, and SWITCH/create a new innerObsv_firebase and then
//      - The innerObsv_firebase$ emits 1. value
//      - The innerObsv_firebase$ emits 2. value
//      - The innerObsv_firebase$ emits values until it's completed/err     OR
//  ... 


const switchMap2 = () => {
    const outerObsv_firebase$ = simulateFirebase("/collection1/doc", 5000);
    const innerObsv_firebase$ = outerObsv_firebase$.pipe(
        //                                                                                                  tap((dataOuterObsv) =>addItem("\outerObservable: " + dataOuterObsv , "yellow")),
        switchMap(
            //every time the outerObsv_firebase emits this func will be excuted  
            (dataOuterObsv) => {
                console.log("outerObservable: " + dataOuterObsv);
                return simulateFirebase("/collection2/doc", 1000);
            })
    )

    innerObsv_firebase$.subscribe(
        (datainnerObsv) => addItem("innerObservable: " + datainnerObsv),
        console.error,
        () => console.log("completed innerObservable")
    )
}
// Output
// outerObservable: /collection1/doc 0 
// 	    innerObservable: /collection2/doc 0 
// 	    innerObservable: /collection2/doc 1 
// 	    innerObservable: /collection2/doc 2 
//  	innerObservable: /collection2/doc 3 
// outerObservable: /collection1/doc 1       
//  	innerObservable: /collection2/doc 0      innerObsv_firebase observable's value has been switched from emitting the values of the first inner observable, to emitting the values of the newly created inner observable
//  	innerObservable: /collection2/doc 1 
//  	innerObservable: /collection2/doc 2 
//  	innerObservable: /collection2/doc 3 
// outerObservable: /collection1/doc 2 
//  	innerObservable: /collection2/doc 0
// ...



// Until now in the above exmples, the value/data emitted by the outerObservable wasn't available in the ".subscribe()", we used just to generate the innerObservable
// But what if we need to use both the outerObservable's & the innerObservable's value/data in the ".subscribe()" 
// We can use the 2. args of switchMap "selector functions" 
//  
//  

const switchMap3 = () => {
    addItem('REMARK: Due to that the outerObservable emits every 5000ms and the innerObservable emits every 1000ms at the 5. sec the "mappingsFunc" rcv the dataOuterObsv, which will take 1000ms before the "selector function" process the data, by this time the outerObservable emits a new value and as a result the "switchMap" will create a new innerObservable and nothing will be rcvd in "subscribe()" at this second');
    const outerObsv_firebase$ = simulateFirebase("/collection1/doc", 5000);
    const innerObsv_firebase$ = outerObsv_firebase$.pipe(
        switchMap(
            // Every time the outerObsv_firebase emits this func "mappingsFunc" will be excuted  
            (dataOuterObsv) => simulateFirebase("/collection2/doc", 1000)
            ,
            // Optional: "selector function" can be used to send the dataOuterObsv to ".subscribe()"
            (dataOuterObsv, dataInnerObsv, outerIndex, innerIndex) => { return [outerIndex, `outerObservable ${outerIndex}: ${dataOuterObsv} \tinnerObservable ${innerIndex}: ${dataInnerObsv}`] }
        )
    )

    innerObsv_firebase$.subscribe(
        (data) => {
            var cl: string = +data[0] % 2 == 0 ? "yellow" : null;
            return addItem(data[1], cl);
        },
        console.error,
        () => console.log("completed innerObservable")
    )
}

//Output
// outerObservable 0: /collection1/doc 0 	innerObservable 0: /collection2/doc 0 
// outerObservable 0: /collection1/doc 0 	innerObservable 1: /collection2/doc 1 
// outerObservable 0: /collection1/doc 0 	innerObservable 2: /collection2/doc 2 
// outerObservable 0: /collection1/doc 0 	innerObservable 3: /collection2/doc 3 
//                                                                                  REMARK: at the 5. sec the "mappingsFunc" rcv the dataOuterObsv, which will take 1000ms before the "selector function" process the data, by this time the outerObservable emits a new value and as a result the "switchMap" will create a new innerObservable and nothing will be rcvd in "subscribe()" at this second
// outerObservable 1: /collection1/doc 1 	innerObservable 0: /collection2/doc 0 
// outerObservable 1: /collection1/doc 1 	innerObservable 1: /collection2/doc 1 
// ...

export { switchMap1, switchMap2, switchMap3 }