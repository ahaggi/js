var promise1 = new Promise(function(resolve, reject) {
  setTimeout(resolve(x), 1000);
});

promise1
  .then((noe)=> console.log('promise1: ' + noe))
  .catch((reason)=>console.log('promise1:  reject:' + reason))
//> ReferenceError: x is not defined

var promise2 = new Promise(function(resolve, reject) {
  const x = 10
  setTimeout(resolve(x), 1000);
});

promise2
  .then((noe)=> console.log('promise2 resolve: ' +noe))
  .catch((reason)=>console.log('promise2 reject: ' +reason))
//>  > "promise1:  reject:ReferenceError: x is not defined"


//**********************************************************************************

let promises = []

for(var i =0 ; i < 10 ; i++ ){
  promises.push(
  	new Promise((resolve,reject)=>{
  		if(i%2===0)
  			resolve(i)
  		else
  			reject(i)
  	})
  	)
}

Promise.all(promises)
  .then((noe)=>console.log(noe))
  .catch((err)=>console.log(err))
