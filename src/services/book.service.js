const Book = require('../db/models').Book;

//TODO: FIX method naming

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

    deleteById(id) {

        //TODO: delete should return the deleted book instense

        return Book.destroy({ where: { id: id } })
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

    getById(id) {
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

    updateById(id, book) {
        return Book
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

module.exports = BooskServices;