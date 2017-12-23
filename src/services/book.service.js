const BookModel = require('../db/models').Book;


//TODO: FIX method naming

class BookServices {

    // (newBookModel) => Promise<newBook>
    create(book) {

        //TODO: Unit test should fail
        book = "not a book";

        return BookModel.create(book)
            .then(newBook => {
                return newBook.toJSON();
            })
            .catch(err => {
                //TODO: Unknown error
                throw err;
            });

    }

    deleteById(id) {

        //TODO: delete should return the deleted book instense

        return BookModel.destroy({ where: { id: id } })
            .then(rowDeleted => {

                if (!rowDeleted) {
                    console.log('No book found')
                    return null;
                }

                return {
                    id: id
                };
            })
            .catch(err => {
                throw err;
            });

    }

    getAll() {
        return BookModel
            .findAll()
            .then(books => {
                return books;
            })
            .catch(err => {
                //TODO: Unknown error
                throw err;
            });

    }

    getById(id) {
        return BookModel
            .findAll({ where: { id: id } })
            .then(books => {
                let book = books[0]

                if (!book) {
                    //TODO no books in db err
                    return null
                }

                return book;
            })

    }

    updateById(id, book) {
        return BookModel
            .update(
            book,                   //what to update
            { where: { id: id } }   //who to update
            )
            .then(rowUpdated => {

                if (!rowUpdated[0]) {
                    console.log('No book found')
                    return null;
                }

                return {
                    id: id
                };

            });
    }
}

module.exports = BookServices;