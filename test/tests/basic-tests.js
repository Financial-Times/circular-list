buster.testCase("Test all the things!", {
	"Expect numbers 1 and 1 to give 2": function () {
		var result = ftLabsStandardJs.plus(1,1);
		assert.equals(result, 2);
	},
	"Expect strings 1 and 1 to give string 11": function () {
		var result = ftLabsStandardJs.plus('1','1');
		assert.equals(result, '11');
	}
});