const _ = require('lodash')
const BookServices = require('../../services/book.service');


class bookCtrl {

    constructor() {
        this.bookService = new BookServices();
    }

    getById(req, res) {
        let id = req.params.id;

        this.bookService.getById(id)
            .then((book) => {
                if (book == undefined) {
                    res.status(404);
                    res.send()
                }
                res.json(book)
            })
            .catch((err) => {
                res.status(500);
                res.send()
            })

    }

    getAll(req, res) {
        this.bookService.getAll()
            .then((books) => {
                res.json(books);
            })
            .catch((err) => {
                res.status(500);
                res.end();
            })
    }

    delete(req, res) {

        let id = req.params.id;
        this.bookService.deleteById(id)
            .then((book) => {

                if (book) {
                    console.log('Deleted successfully');
                    res.json(book);
                }
                else {
                    res.status(404)
                    res.end()
                }

            })
            .catch((err) => {
                res.status(500)
                res.end()
            })
    }

    //Create
    create(req, res) {

        let newBook = req.body;

        this.bookService.create(newBook)
            .then((newBook) => {
                res.send(newBook);
            })
            .catch((err) => {
                res.status(500)
                res.end();
            })


    }

    update(req, res) {

        let id = req.params.id;
        let book = req.body;

        this.bookService.updateById(id, book)
            .then((book) => {
                if (book) {
                    console.log('update successfull');
                    res.json(book);
                }
                else {
                    res.status(404)
                    res.end()
                }
            })
            .catch((err) => {
                res.status(500)
                res.end()
            })
    }

}

module.exports = bookCtrl;
