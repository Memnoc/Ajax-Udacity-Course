/******************* Static methods: Promise.race() ********************/
/** Promise.race is a method to execute multiple promises in parallel
 * but only resolve the result of the fastes one.
 */

var askJohn = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('Yes, I have got one extra pen'), 3000);
    })
}

var askEugene = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('Sorry dude, only got one pen'), 5000);
    })
}

var askSusy = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('Sure, I have a pen for you'), 2000);
    })
}

/**
 * Promise.race() accepts an array of promises as argument
 * Since it returns a promise, we can call .then on it
 * .then will capture the value of the first resolved promise
 * and ignore the rest of them
 * 
 * If you have a .catch() block, and one promise is rejected
 * faster than any other is resolved, Promise.race()
 * will reject that and ignore the others.
 * 
 * Bottom line: Promise.race() will always favour the first promise
 * to be resolved or rejected, and ignore all the rest..just like a race? uh...
 */
Promise.race([askJohn(), askEugene(), askSusy()])
    .then(value => {
        console.log(value);
    })
    .catch(reason => {
        console.log('Rejected:' + reason);
    })
    // Sure, I have a pen for you