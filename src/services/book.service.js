const Book = require('../db/models').Book;

class BooskServices {

    // (newBookModel) => Promise<newBook>
    create(book) {

        return Book.create(book)
            .then(book => {
                return book.toJSON();
            })
            .catch(err => {
                //TODO: Unknown error
                throw err;
            });

    }

    deleteByID(id) {

        return Book.destroy({ where: { id: id } })
            .then(rowDeleted => {
                return rowDeleted
                if (!rowDeleted) {
                    console.log('No book found')
                    return null;
                }
            }).catch(err => {
                throw err;
            })

    }

    getAllBooks() {
        return Book
            .findAll()
            .then(books => {
                return books;
            })
            .catch(err => {
                //TODO: Unknown error
                throw err;
            });

    }

    getBookById(id) {
        return Book
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
}

module.exports = BooskServices;