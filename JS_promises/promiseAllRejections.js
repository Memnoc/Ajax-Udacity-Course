/******************* Handling rejections with Promise.all() ********************/
/**
 * Check parallelPromises.js for context about this code
 * 
 * Promise.all() is rejected if one of the promises passed to it is rejected
 * askSecondDealer() has been modified to be rejected 
 * 

 * */

function askFirstDealer() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(8000), 3000);
    });
}

function askSecondDealer() {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject('Not suitable car'), 5000);
    });
}

function askThirdDealer() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(10000), 8000);
    });
}

/**
 * Promise.all() return the rejected because of the second promise is rejected
 * Adding a catch block to catch the rejection
 */
// Promise.all([askFirstDealer(), askSecondDealer(), askThirdDealer()])
//     .then(prices => {
//         console.log(prices);
//     })
//     .catch(error => {
//         console.log(error);
//     })

/**
 * HOW DO WE FIX THIS: 
 * what if we don't want to abandon all the other values,
 * just because one is rejected?
 * We can add a .catch block to the promises!
 * This time, the rejection is caught bu doesn't stop the execution
 * This is possible because each blocks returns a promise
 * and if the promise is not rejected, then it's solved
 * Prints: [ 8000, 'Not suitable car', 10000 ]
 */

Promise.all([
        askFirstDealer().catch(error => { return error }),
        askSecondDealer().catch(error => { return error }),
        askThirdDealer().catch(error => { return error })
    ])
    .then(prices => {
        console.log(prices);
    })