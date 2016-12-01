var assert = require('assert')
    , crypto = require('crypto')
    , shell = require('shelljs')
    , kALGORITHM = 'prime256v1'
    ;

describe('🏁 hello auto test!', function () {

    it("🏳 should set $var to 'Hello World'", function () {
        $var = 'Hello World';
        assert.equal($var, 'Hello World');
    });

    // Will not run tests with it.skip call OR this.skip() in body
    it("🏳 should list available elliptic curves", function (done) {
        //this.skip();

        // list via OpenSSL
        console.log('via OpenSSL:');
        console.log('============');
        shell.exec('openssl ecparam -list_curves');

        // list via nodejs API
        console.log('via NodeJS API:');
        console.log('===============');
        const curves = crypto.getCurves();
        console.log('Curves -> ', curves);
        done();

    });

    it("🏳 should test textbook ECDH with nodejs", function (done) {
        // Generate party A keys 
        const A = crypto.createECDH(kALGORITHM);
        const A_key = A.generateKeys();
        // Generate party B keys
        const B = crypto.createECDH(kALGORITHM);
        const B_key = B.generateKeys();

        // Exchange and generate secret 
        const A_secret = A.computeSecret(B_key); // outputs buffer
        const B_secret = B.computeSecret(A_key); // outputs buffer

        // Compare resulting shared secret 
        assert.equal(A_secret.toString('hex'), B_secret.toString('hex'));

        done();
    });

});