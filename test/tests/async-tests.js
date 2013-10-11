buster.testCase("Test all the things asynchronously!", {
	"Expect numbers 1 and 1 to give 2 with an async done method": doneLikeAsyncTest,
	"Expect numbers 1 and 1 to give 2 with an async done method with callback": doneLikeWithCallbackAsyncTest,
	"Expect numbers 1 and 1 to give 2 in a promise": promiseLikeAsyncTest
});

// Call done when the async task is finished.
function doneLikeAsyncTest(done) {
	var result;
	setTimeout(function () {
		result = ftLabsStandardJs.plus(1,1);
		assert.equals(result, 2);
		done();
	}, 0);

}

// Pass a callback to the done function.
function doneLikeWithCallbackAsyncTest(done) {
	var result;
	setTimeout(done(function doneCallback() {
		result = ftLabsStandardJs.plus(1,1);
		assert.equals(result, 2);
	}), 0);

}

// Buster also handles promises.
// Buster treats an object as a
// promise if it has a promise
// like'then' method. Buster
// uses the then method to
// terminate the test.
// A third party library
// implementing promises
// or deferred objects could
// also be used.
function promiseLikeAsyncTest() {

	var promise = {
		then: function (callback) {
			this.callbacks = this.callbacks || [];
			this.callbacks.push(callback);
		}
	};

	var result;

	setTimeout(function () {
		result = ftLabsStandardJs.plus(1,1);
		assert.equals(result, 2);

		var callbacks = promise.callbacks || [];

		for (var i = 0, l = callbacks.length; i < l; ++i) {
			callbacks[i]();
		}
	}, 0);

	return promise;
}
