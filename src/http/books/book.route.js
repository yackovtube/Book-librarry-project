const Router = require('express').Router;
const BookValidaitors = require('./book.validators');
const BookCtrl = require('./book.ctrl');

class BookRouterProvider {

    constructor() {
        this._initValidatiors();
    }

    create() {
        let router = Router();
        let bookCtrl = new BookCtrl;

        router.get('/', bookCtrl.getAll.bind(bookCtrl) );
        router.get('/:id', [this.idValidateMW, bookCtrl.getById.bind(bookCtrl)]);
        router.delete('/:id', [this.idValidateMW, bookCtrl.delete.bind(bookCtrl)])
        router.post('/', [this.newBookValidateMw, bookCtrl.create.bind(bookCtrl)])
        router.put('/:id', [this.idValidateMW, this.updateBookValidateMW, bookCtrl.update.bind(bookCtrl)])

        return router;
    }

    _initValidatiors() {
        var bookValidators = new BookValidaitors;

        this.idValidateMW = function (req, res, next) {

            try {
                req.params.id = bookValidators.validateId(req.params.id);
                next();
            }
            catch (e) {
                res.status(400);
                res.send(e.message);
            }
        }

        this.newBookValidateMw = function (req, res, next) {
            try {
                req.body = bookValidators.validateNewBook(req.body);
                next();
            }
            catch (e) {
                res.status(400);
                res.send(e.message);
            }
        }

        this.updateBookValidateMW = function (req, res, next) {
            try {
                req.body = bookValidators.validateUpdateBook(req.body);
                next();
            }
            catch (e) {
                res.status(400);
                res.send(e.message);
            }
        }


    }


}

module.exports = BookRouterProvider;

