class Calc {

	add(a, b) {

		if (typeof a == 'string' || typeof b == 'string') {
			throw new Error('String is not allowd !');
		}

		return a + b;
	}

	sub(a, b) {
		return a - b;
	}

	subAsync(a, b, cb) {
		setTimeout(() => {
			let res = this.sub(a, b);
			cb(null, res);
		}, 0);
	}

	subPromise(a, b) {
		return new Promise((resolve, reject) => {
			this.subAsync(a, b, (err, res) => {
				if (err) {
					reject(err);
				}
				else {
					resolve(res)
				}
			})
		})
		 
	}

}


describe("Calc ", function () {

	let calc;

	beforeEach(()=>{
		calc = new Calc();
	});

	describe("add", function () {

		it("should add two numbers", function () {

			var res = calc.add(1, 2);

			calc.sub = 22;

			expect(res).toBe(3);
		});

		it("should not add string", function () {

			var res;

			try {
				res = calc.add(1, "this is a string");
			}
			catch (e) {

			}

			expect(res).toBe(undefined);

		});

	});

	describe("sub", function () {
		it("should subtract b from a", function () {

			var res = calc.sub(3, 2);

			expect(res).toBe(1);
		});

	});

	describe("subAsync", function () {
		it("should subtract b from a", function (done) {

			calc.subAsync(3, 2, (err, res) => {

				expect(res).toBe(1);
				done();
			});

		});

	});

	describe("subPromise", function () {
		it("should subtract b from a", function (done) {

			calc.subPromise(3, 2)
				.then((res) => {
					expect(res).toBe(1);
					done();
				});

		});

	});

});

