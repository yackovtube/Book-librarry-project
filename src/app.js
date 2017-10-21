const express = require('express');
const bodyParser = require('body-parser');

const BookRouterProvider = require('./http/books/book.route');

class App {
    constructor() {

        this._init();
        console.log('loged on');
    }

    run() {
        this.express.listen(3000);
        console.log('runing...');
    }

    _init() {
        this._initRoutes();

        this.express = express();

        //middlewares
        this.express.use(bodyParser.json());

        //routes
        this.express.use('/api/v1/books', this.bookRoute);

    }

    _initRoutes() {
        let bookRouterProvider = new BookRouterProvider;

        this.bookRoute = bookRouterProvider.create();

    }

}

module.exports = App;