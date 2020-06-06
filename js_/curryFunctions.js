

const f = (arg1) => (arg2) => { console.log(arg1 + ' ' + arg2) }

let ff = f('arg1')
ff('arg2')
//
console.log(true && undefined)

/**************************************************************************** */


function g(arg1) {
	return function (arg2) { console.log(arg1 + ' ' + arg2) }
}

let k = g('str1');
k('str2');

//eller
g('str3')('str4');

//eller
(g('str5'))('str6');

//  /*********************************    ArrowFunctions   *************************************** */

// returns: undefined
// explanation: an empty block with an implicit return
((name) => { })();

// returns: 'Hi Jess'
// explanation: no block means implicit return
((name) => 'Hi ' + name)('Jess');

// returns: undefined
// explanation: explicit return required inside block, but is missing.
((name) => { 'Hi ' + name })('Jess');

// returns: 'Hi Jess'
// explanation: explicit return in block exists
((name) => { return 'Hi ' + name })('Jess');

// returns: undefined
// explanation: a block containing a single label. No explicit return.
// more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label
((name) => { id: name })('Jess');

// returns: {id: 'Jess'}
// explanation: implicit return of expression ( ) which evaluates to an object
((name) => ({ id: name }))('Jess');

// returns: {id: 'Jess'}
// explanation: explicit return inside block returns object
((name) => { return { id: name } })('Jess');

// explicit return
const filterItems = (query) => {
	return fruits.filter((el) => {
		return el.toLowerCase().indexOf(query.toLowerCase()) > -1
	}
	);
}
//implicit return
const filterItems = (query) =>
	fruits.filter((el) =>
		el.toLowerCase().indexOf(query.toLowerCase()) > -1
	);
