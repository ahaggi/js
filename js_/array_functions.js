//https://developer.mozilla.org/.... /Array

// filter 
// newArr = oldArr.filter( (elm) => return true or false ) ,,, 
// Hvis true legg "elm" til "newArr",
// og hvis returnerer false på alle "alm" i "oldArr", vil "newArr" bli en tom array


const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];

// OBS det r 2 implicit return her
const filterItems = (query) => 
  fruits.filter((el) =>
    el.toLowerCase().indexOf(query.toLowerCase()) > -1
  );
  
console.log(filterItems('ap')); // ['apple', 'grapes']
console.log(filterItems('an')); // ['banana', 'mango', 'orange']


// *************************************************************************************************************



// Obs denne mutate array-en selv
// The splice() method changes the contents of an array by removing existing elements and/or adding new elements

var months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// Go to index 1 + delete 0 elements + insert 'Feb'
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'June']

//['Jan', 'Feb', 'March', 'April', 'June']
months.splice(4, 1, 'May');
// Go to 4th index + delete 1 element + insert 'May'
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'May']

//['Jan', 'Feb', 'March', 'April', 'May']
months.splice(3, 2, 'Jul'); 
// Go to 3rd index + delete 2 element + insert 'Jul'
console.log(months);


//​​​​​[ 'Jan', 'Feb', 'March', 'Jul' ]​​​​​
months.splice(1, 2, '1' , '2' , '3'); 
// Go to index 1 + delete 2 element + insert '1', '2' , '3'
console.log(months);
