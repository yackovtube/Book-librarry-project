const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Sequelize = require('sequelize');

const db = require('../models');
const User = require('../models/user');

const BookRouterProvider = require('./http/books/book.route');

const JWT_SECRET = 'shhhhh';

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
        this._initDb();

        this.express = express();

        //middlewares
        this.express.use(cookieParser());
        this.express.use(bodyParser.json());

        //authenticaiton
        this.express.post('/api/v1/token', function (req, res) {

            let username = req.body.username;
            let password = req.body.password;

            if (username == 'admin' && password == 'password') {

                var token = jwt.sign({ user: { id: Date.now() } }, JWT_SECRET);

                res.cookie('token', token);

                res.json({
                    token: token
                });
            }
            else {
                res.status(401);
                res.end();
            }

        });

        this.express.get('/api/v1/me', function (req, res) {

            try {
                let toDecode;
                if (req.headers["x-auth"]) {
                    toDecode = req.headers["x-auth"];
                }
                else {
                    toDecode = res.cookies.token;
                }

                var token = jwt.verify(toDecode, JWT_SECRET);
                res.send(token.user);
            }
            catch (e) {
                res.status(401);
                res.end();
            }
        })

        //routes
        this.express.use('/api/v1/books', this.bookRoute);

    }

    _initRoutes() {
        let bookRouterProvider = new BookRouterProvider;

        this.bookRoute = bookRouterProvider.create();

    }

    _initDb() {

        // db.User.create({
        //     firstName: 'John',
        //     lastName: 'Hancock',
        //     username: 'test',
        //     password: 'test',
        //     email: 'test',
        // });


        db.User.findAll().then(users => {
            console.log(users.length)
        })

    }

}

module.exports = App;