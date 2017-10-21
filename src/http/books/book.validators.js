const Joi = require('joi');

class BookValidators {
    constructor() {

    }

    validateId(id) {
        let result = Joi.validate(id, idSchema);
        if(result.error){
            throw(result.error);
        }
        return result.value;
    }

    validateNewBook(newBook){
        let result = Joi.validate(newBook, newBookSchema);
        if(result.error){
            throw(result.error);
        }
        return result.value;
    }

    validateUpdateBook(book){
        let result = Joi.validate(book, updateBookSchema);
        if(result.error){
            throw(result.error);
        }
        return result.value;
    }

}

const idSchema = Joi.number().integer().positive();

const baseBookSchema = Joi.object().keys({
    name: Joi.string().min(2).max(32),
    discription: Joi.string().max(512),
    author: Joi.string().min(2).max(32)
});
const newBookSchema = baseBookSchema.requiredKeys('name', 'author');
const updateBookSchema = baseBookSchema.or('name', 'discription', 'author');

module.exports = BookValidators;