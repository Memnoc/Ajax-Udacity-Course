/******************* Executing promises in parallel with Promise.all() ********************/
/**
 * Scenario: getting offers to sell your car from 3 different car dealers
 * The dealers all have API, but they run at different times
 * The task is to execute all 3 functions at the same time
 *  even if they have different time response
 * 
 * The parameter inside resolve(8000) is the price for the car
 * The second parameter 3000 is the waiting time for the API to respond
 * */

function askFirstDealer() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(8000), 3000);
    });
}

function askSecondDealer() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(12000), 5000);
    });
}

function askThirdDealer() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(10000), 8000);
    });
}

/**
 * Promise.all accepts an array of values.
 * You can pass any values to it, promises included
 * Since it's a promise, you can use .then on it
 * 
 * Promise.all() returns a Promise
 * Promise.all() is solved when all the Promises in the array are solved,
 * when the array contains no promises (ex. non-promise value example),
 * when you pass an empty array (ex. empty array value example)
 * 
 * We resolve all three promises with the value of price
 * that we receive from the 3 functions, and that gets stored into an array
 * [8000, 120000, 10000]
 */
Promise.all([askFirstDealer(), askSecondDealer(), askThirdDealer()])
    .then(prices => {
        console.log(prices);
    })

// Non-promise value example (RUN IN CONSOLE)
/** Output from dev console:
 * 
[PromiseStatus]]: "resolved"
[[PromiseValue]]: Array(3)
0: 1
1: "string"
2: true
length: 3
__proto__: Array(0)
 *
 */

Promise.all([1, 'string', true]);

// Empty Array value example (RUN IN CONSOLE)
// Immediately solved with an empty array
Promise.all([]);