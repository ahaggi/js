

//Pga at obj1 ikke har noen annen "a" følgende vil ha det samme resultat :


var obj1 = {a:[1,2,3]}
var obj2 = {...obj1, a: [...obj1.a , 4]}

console.log(obj1) //> Object { a: Array [1, 2, 3] }
console.log(obj2)//> Object { a: Array [1, 2, 3, 4] }


var obj1 = {a:[1,2,3]}
var obj2 = {a: [...obj1.a , 4]}

console.log(obj1) //> Object { a: Array [1, 2, 3] }
console.log(obj2)//> Object { a: Array [1, 2, 3, 4] }

/*************************************************************/

// MEN

/**


var obj1 = {a:[1,2,3] , b:[9,8,7]}
var obj2 = {a: [...obj1.a , 4]}

console.log(obj1)
console.log(obj2)
//> Object { a: Array [1, 2, 3], b: Array [9, 8, 7] }
//> Object { a: Array [1, 2, 3, 4] }




var obj1 = {a:[1,2,3] , b:[9,8,7]}
var obj2 = {...obj1 , a: [...obj1.a , 4]}

console.log(obj1)
console.log(obj2)
//> Object { a: Array [1, 2, 3], b: Array [9, 8, 7] }
//> Object { a: Array [1, 2, 3, 4], b: Array [9, 8, 7] }


*/