
//*************************************************************************************************************
/*
async ensures that the function returns a promise,
The word “async” before a function means one simple thing: a function always returns a promise. 
If the code has return <non-promise> in it, then JavaScript automatically wraps it into a resolved promise with that value.

For instance, the code returns a resolved promise with the result of 1
*/
async function f1() {
    return 1;
}
f1().then(res => console.log(res)); // 1


async function f2() {
    return Promise.resolve(2);
}
f2().then(res => console.log(res)) // 1


/*
The keyword await makes JavaScript wait until that promise settles and returns its result
await literally makes JavaScript wait until the promise settles, and then go on with the result. 
That doesn’t cost any CPU resources, because the engine can do other jobs meanwhile: execute other scripts, handle events etc.

 */

async function g() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 10000)
    });
    let result1 = await promise; // wait till the promise resolves (*)
    console.log('reesssssssss')
    let result2 = promise.then(res => { console.log(res); })//hvorfor blir returnert en Promise her? altid behandl res inni .then

    console.log(result1 + ' ' + result2); // "done!"
}

g() ;


//If the value is not a Promise, it converts the value to a resolved Promise, and waits for it.
async function k(){
    let y = await 3;
    console.log(y)
}
k()



const fetch = require('node-fetch')
const url = "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API";

async function t() {
    let res1 = await fetch(url);
   
    let res2 = await fetch(url);
    
  
  return [ res1, res2 ]
}
t().then((value) => console.log(value));

function t2() {
    let promise1 = fetch(url);
    return promise1.then((res1) => {
        let promise2 = fetch(url);
        return promise2.then((res2) => {
            return [res1, res2];
        });
    });
}
t2().then((res) => console.log(res));