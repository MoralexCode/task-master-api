const encryptPassword = {};
const salt = "passwordKey";
var crypto = require('crypto');

encryptPassword.getEncyptPassword = (password)=>{
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return value;
}


module.exports = encryptPassword;
