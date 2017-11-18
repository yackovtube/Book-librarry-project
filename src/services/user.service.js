const crypto = require('crypto');

const User = require('../db/models').User;

const SECRET = 'abcdeasds2#$adsadfg'; //TOOD: load from vault

class UserService {

    create(email, password) {

        let salt = UserService._genRandomString(4);
        let hashPassword = UserService._hash(password, salt);

        return User.create({ email: email, password: hashPassword, salt: salt })
            .then(user => {
                return user;
            })
            .catch(err => {

                if (err.name === 'SequelizeUniqueConstraintError' && err.fields.includes('email')) {
                    //TODO: email exsists
                    return err;
                }

                //TODO: Unknown error
                return err;

            });

    }

    getByCradentials(email, password) {

        return User
            .findAll({
                where: {
                    email: email
                }
            })
            .then(users => {

                let user = users[0];

                if(!user){
                    //TODO: error: user not found
                    return null;;
                }

                let hashPassword = UserService._hash(password, user.salt);
                if (hashPassword != user.password) {
                    return null;
                    //TODO: error: user not found (insted of invalid password)
                }
                
                return user;
                
            })

    }

}

UserService._genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length);   /** return required number of characters */
};

UserService._hash = function (toHash, salt) {
    let hash = crypto.createHmac('sha512', SECRET);
    hash.update(toHash + salt);
    return hash.digest('hex');
}

module.exports = UserService


/**
 * 
 * id | email | passowrd            | salt
 * 1  | dann  | hash(12345+salt1)   | salt1
 * 2  | thej  | hash(12345+salt2)   | salt2
 * 
 * 
 * - hash | data | hash(data) -> hashData -x-> data
 * - encript | data | y(data) -> encriptData | z(encriptData) -> data
 * 
 */