/**
 *  A promise takes 2 parameters: resolve and reject
 * If a promise is never resolved or reject, stays on 'pending' forever
 * Resolve or reject can only be called once
 **/

// const a1 = new Promise(function(resolve, reject) {
//     resolve('Hello world');
// });
// const a2 = new Promise(function(resolve, reject) {
//     reject('Promise is rejected');
// });

/******************************************** Promise methods: THEN ********************************************/

/**
 * Promise methods: THEN
 * Then takes 2 arguments: onFulfilled, onRejected
 * THEN returns a Promise.
 * onFufliflled gets passed the argument value of resolved(value)
 * onRejected gets passed the argument value of reject(reason)
 */
// a1.then(function(value) {
//     console.log('Promise is resolved with ' + value);
// }, function(reason) {
//     console.log('Promise is rejected with ' + reason);
// });

/**
 * Function that sums up two numbers
 * @param {number} a 
 * @param {number} b 
 * This function stores the promise in a variable]
 * Rejects if arguments are not number
 * Resolve if arguments are numbers
 */
// function sum(a, b) {
//     const result = new Promise(function(resolve, reject) {
//         if (typeof a != 'number' || typeof b != 'number') {
//             return reject(new Error('Function sum: Both arguments should be numbers'));
//         }
//         return resolve(a + b);
//     });
//     return result;
// }

// The result is 7
// sum(4, 3).then(function(value) {
//     console.log('The result is ' + value);
// }, function(reson) {
//     console.log('Error ' + reason);
// });

// Error Error: Both arguments should be numbers
// sum('a', 'b').then(function(value) {
//     console.log('The result is ' + value);
// }, function(reason) {
//     console.log('Error ' + reason);
// });

/******************************************** CHAINING PROMISES with THEN ********************************************/

/**
 * Function that multiplies a number by itself
 * @param {number} a 
 * This function stores the promise in a variable]
 * Rejects if argument is not number
 * Resolve if argument is numbers
 */
// function square(a) {
//     const result = new Promise(function(resolve, reject) {
//         if (typeof a != 'number') {
//             return reject(new Error('Function square: Both arguments should be numbers'));
//         }
//         return resolve(a * a);
//     });
//     return result;
// }

/**
 * CHAINING
 * It's possible because .then returns a promise
 * So, when you return square(result) you can chain another .then
 * The first .then is the onFulfilled(value) of sum(a, b), which resolves calling another function
 * that returns a new Promise.
 * The second .then is the onFulfilled(value) of square(a)
 * The function(error) is the onRejected(reason) of square(a)
 * (Error: Function square: Both arguments should be numbers)
 */
// sum(1, 2)
//     .then(function(result) {
//         return square('a');
//     })
//     .then(function(finalResult) {
//         console.log(finalResult);
//     }, function(error) {
//         console.log(error);
//     })

/******************************************** Promise methods: CATCH ********************************************/

/**
 * RESULT: Error with catchError: Function square: Both arguments should be numbers
 * .catch() is the version of try/catch that works asynchronously
 * The normal catch is synchronous
 * .catch is asynchronous, that's why you use it in promises
 * (if you use await then you can use the normal catch cause await makes it async)
 * Works exactly like putting a second function for onRejected(), but looks nicer
 */
// sum(1, 2)
//     .then(function(result) {
//         return square('a');
//     })
//     .catch(function(error) {
//         console.log('Error with catch' + error);
//     })

/******************************************** Promisify functions ********************************************/

/**
 * Function that capitalize text
 * @param {text to capitalise} text 
 */
// function capitalize(text) {
//     return text[0].toUpperCase() + text.substr(1);
// }

// Promisified 
// function capitalize(text) {
//     return new Promise(function(resolve, reject) {
//         if (typeof text != 'string') {
//             return reject(new Error('Argument should be a string'));
//         }
//         const result = text[0].toUpperCase() + text.substr(1);
//         return resolve(result);
//     });
// }

/******************* Convert any value into a promise: Promise.resolve() & Promise.reject() ********************/

/**
 * Function that prints the value of a promise to console
 * @param {takes a promise as a value} somePromise 
 */
function logToConsole(somePromise) {
    somePromise.then(value => console.log(value));
}

/**
 * A promise to be passed to logToConosle()
 */
const somePromise = new Promise(
    (resolve, reject) => resolve('Hello'))

// Resolve the promise printing 'Hello'
logToConsole(somePromise);

// What if we want to pass some other value to logToConsole?

const value = 'string';

// Returns error somePromise.then is not a function
// Because the value passed is not a promise
// logToConsole(value);

// Converting to a promise using Promise.resolve()

const promisifiedValue = Promise.resolve(value);

// Prints string in console
logToConsole(promisifiedValue);

// Using Promise.resolve() you can create a rejected promise
// Prints  Uncaught (in promise) string
const rejectedPromise = Promise.reject(value);