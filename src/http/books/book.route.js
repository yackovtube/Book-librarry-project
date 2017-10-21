const Router = require('express').Router;
const BookValidaitors = require('./book.validators');

class BookRouterProvider{

    constructor(){
        this._initValidatiors();
    }

    create(){
        let router = Router();

        router.get('/', function(req,res){
            res.send('Hello world')
        })
        
        router.get('/:id', [this.idValidateMW, function(req,res){
            res.send('Book: ' + req.params.id)
        }])

        router.post('/', [this.newBookValidateMw ,function(req,res){

            console.log(req.body);

            res.send(req.body)
        }])
        
        router.put('/:id', [this.idValidateMW, this.updateBookValidateMW, function(req,res){
            res.send('Book: ' + req.params.id + ' udated')
        }])

        router.delete('/:id', [this.idValidateMW ,function(req,res){
            res.send('Dlete: ' + req.params.id)
        }])
        
        return router;
    }

    _initValidatiors(){
        var bookValidators = new BookValidaitors;

        this.idValidateMW = function(req, res, next){

            try{
                req.params.id = bookValidators.validateId(req.params.id);
                next();
            }
            catch(e){
                res.status(400);
                res.send(e.message);
            }
        }

        this.newBookValidateMw = function(req, res, next){
            try{
                req.body = bookValidators.validateNewBook(req.body);
                next();
            }
            catch(e){
                res.status(400);
                res.send(e.message);
            }
        }

        this.updateBookValidateMW = function(req, res, next){
            try{
                req.body = bookValidators.validateUpdateBook(req.body);
                next();
            }
            catch(e){
                res.status(400);
                res.send(e.message);
            }
        }
        

    }


}

module.exports = BookRouterProvider;

