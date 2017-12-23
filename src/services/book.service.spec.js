const mock = require('mock-require');
const DONT_CARE = "DONT_CARE";

describe("BookServices", () => {

	let bookServices;
	let mockModels;

	beforeEach(() => {

		mockModels = {
			Book: {}
		}

		//injects mocks 
		mock('../db/models', mockModels);

		//init model
		const BookServices = mock.reRequire('./book.service');

		//create instance
		bookServices = new BookServices();

	});

	describe("create", () => {

		it("should sucsseuly create a new book", (done) => {

			//given
			let book = DONT_CARE;
			let createStab = (book) => {

				return Promise.resolve({
					toJSON: () => {
						return DONT_CARE
					}
				});

			};

			//when
			mockModels.Book.create = createStab; //inject
			let createPromise = bookServices.create(book);

			//then
			createPromise.then((newBook) => {
				expect(newBook).toBeDefined();
				done();
			});

		});

		it("should handle the error", (done) => {

			//given
			let book = DONT_CARE;
			let createStab = (book) => {
				return Promise.reject(DONT_CARE);
			};

			//when
			mockModels.Book.create = createStab; //inject
			let createPromise = bookServices.create(book);

			//then
			createPromise.catch((err) => {
				expect(err).toBeDefined();
				done();
			});

		});
	});

	describe("deleteById", () => {
		it("should delete a book by id", (done) => {

			let expectedResposne = { id: DONT_CARE };

			//given
			let id = DONT_CARE;
			let destroyStab = ((id) => {
				return Promise.resolve({})
			})

			//when
			mockModels.Book.destroy = destroyStab;
			let destroyPromise = bookServices.deleteById(id);

			//then
			destroyPromise.then((book) => {
				expect(book.id).toEqual(expectedResposne.id);
				done();
			});
		})
		it("should return null if book not found", (done)=>{

			//given
			let id = DONT_CARE;
			let destroyStab = ((id) => {
				return Promise.resolve(null)
			})

			//when
			mockModels.Book.destroy = destroyStab;
			let destroyPromise = bookServices.deleteById(id);

			//then
			destroyPromise.then((book) => {
				expect(book).toEqual(null);
				done();
			});

		})

		it("should handle error", (done)=>{

			//given 
			let id = DONT_CARE;
			let destroyStab = ((id) => {
				return Promise.reject({})
			})

			//when
			mockModels.Book.destroy = destroyStab;
			let destroyPromise = bookServices.deleteById(id);

			//then
			destroyPromise.catch((err)=>{
				expect(err).toBeDefined();
				done();
			})
		})
	})

});