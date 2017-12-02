const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Sequelize = require('sequelize');

const db = require('./db/models');

const BookRouterProvider = require('./http/books/book.route');
const UserService = require('./services/user.service');


const JWT_SECRET = 'shhhhh';

class App {
    constructor() {

        Promise.all([
            this._initDb(),
            this._initServices(),
            this._initRoutes(),
            this._initHttp()
        ])
            .catch(err => {
                console.error('bootstraping error', err);
                process.exit(1);
            });
    }

    run() {
        this.express.listen(3000);
        console.log('runing...');
    }

    _initServices() {
        this.userService = new UserService();
        return Promise.resolve();
    }

    _initRoutes() {
        let bookRouterProvider = new BookRouterProvider;

        this.bookRoute = bookRouterProvider.create();

        return Promise.resolve();

    }

    _initHttp() {

        let _this = this;
        this.express = express();

        //middlewares
        this.express.use(cookieParser());
        this.express.use(bodyParser.json());

        //authenticaiton
        this.express.post('/api/v1/token', function (req, res) {

            let username = req.body.username;
            let password = req.body.password;

            _this.userService.getByCradentials(username, password)
                .then(user => {

                    if (user === null) {
                        throw new Error('invalid credentials');
                    }

                    console.log('User login: ' + user.id + ' | ' + user.email, new Date);

                    var token = jwt.sign({ user: user.id }, JWT_SECRET);
                    res.cookie('token', token);

                    res.json({
                        token: token
                    });

                })
                .catch(err => {
                    res.status(401);
                    res.end();
                });

        });

        //TODO: extract to it own controller
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
        this.express.use('/api/v1/books', [this._isValidUserMW, this.bookRoute]);

        return Promise.resolve();

    }

    _initDb() {

        return db.sequelize.authenticate()
            .then(() => {
                console.log('DB Connection has been established successfully.');
                return db;
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
                //TODO: handle bootstrap error
                throw err;
            })

    }


    _isValidUserMW(req, res, next) {

        try {
            let toDecode;
            if (req.headers["x-auth"]) {
                toDecode = req.headers["x-auth"];
            }
            else {
                toDecode = res.cookies.token;
            }

            var token = jwt.verify(toDecode, JWT_SECRET);
            req.user = token.user;
            next();
        }
        catch (e) {
            res.status(401);
            res.end();
        }

    }

}

module.exports = App;