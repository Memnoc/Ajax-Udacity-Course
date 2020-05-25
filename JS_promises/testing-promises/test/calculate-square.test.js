// npm test to run the test script
// import libraries
const calculateSquare = require('../src/calculate-square.js');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
// injecting extension for chai libraries
chai.use(chaiAsPromised);
// import expect function
const expect = chai.expect;


// test suite

/**
 * eventually is perhaps the most important property here,
 * since it's the one that allows to tets promises.
 * Chai will wait until the promise become resolve or rejected.
 * The compares its value with the expected one.
 */
describe('clalculateSquare', function() {
    it('should resolve with number 4 if passed number 2', function() {
        return expect(calculateSquare(2)).to.eventually.be.equal(4);
    });

    // bit of ES6 syntax => is fine
    it('should become fuflfilled when passed number 2', () => {
        return expect(calculateSquare(2)).to.be.fulfilled;
    });

    it('should be rejected if passed a string instead of a number', () => {
        return expect(calculateSquare('string')).to.be.rejected;
    })

    // If you cannot use return, use the provided notify(callback)
    it('should resolve with number 4 if passed number 2', function(done) {
        expect(calculateSquare(2)).to.eventually.be.equal(4).notify(done);
    });

    // bit of ES6 syntax => is fine
    it('should become fuflfilled when passed number 2', (done) => {
        expect(calculateSquare(2)).to.be.fulfilled.notify(done);
    });

    it('should be rejected if passed a string instead of a number', (done) => {
        expect(calculateSquare('string')).to.be.rejected.notify(done);
    })

    /**
     * If the tested function needs more time to run (default for chai is 2sec),
     * you can increase the time of the test case.
     * Usually, it is recommended oto give 1sec timeout higher in the test
     * compared to the source function.
     * You can out the timeout() right after the describe to apply it
     * to all the test cases.
     */

    it('should resolve with number 4 if passed number 2', function() {
        this.timeout(3000);
        return expect(calculateSquare(2)).to.eventually.be.equal(4);
    });

    /**
     * Testing multiple assertions syntax
     */

    it('should resolve with number 4 if passed number 2', () => {
        return calculateSquare(2).then(result => {
            expect(result).to.be.above(3);
            expect(result).to.be.equal(4);
        })
    });

    /**
     * Dealing with multiple rejections assertions
     */

    it('should return a rejected promise when passed a string', () => {
        return calculateSquare('string').catch((reason) => {
            expect(reason).to.not.equal(null);
            expect(reason.message).to.equal('Argument of type number is expected');
        })
    });
})