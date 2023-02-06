const logger = require('../utils/logger')
const Util = {};

// this is for assign the value of the params to  model to send DB
// this save  : example user.name= params.name
Util.asignarLlaveValor = (modelo, key, values) => {
    for (var i = key.length - 1; i >= 0; i--) {
        modelo[key[i]] = values[key[i]]
    }
}

Util.validarNull = (key, array) => {
    console.log('Array  : ', array)
    for (var i = key.length - 1; i >= 0; i--) {
        console.log(i, array[key[i]])
        if (array[key[i]] == null) { //|| array[key[i]] == undefined || array[key[i]] == '') { // array[key[i]] ||
            console.log('el valor es null : ', key[i], array)
            return false;
        }
    }
    return true;
}

Util.message = (respuesta, data, message) => {
    respuesta.status(200).send({
        code: 200,
        data,
        message,
        successfull: true,
    })
}

Util.errorMessage = (respuesta, data, message, codeResponse) => {
    const code = (codeResponse && codeResponse != undefined && codeResponse != null) ? codeResponse : 500;
    console.log('Error values | ', data)
    respuesta.status(code).send({
        code,
        data,
        message,
        successfull: false,
    })
}

Util.print = (controllerName, mensaje) => {
    console.log('\n' + controllerName + ' | ' + JSON.stringify(mensaje) + '\n')
    logger.info(validate(controllerName) + ' | ' + JSON.stringify(mensaje))

}

function JSON2String(data) {
    if (IsJsonString(data)) {
        return JSON.stringify(data)
    } else {
        return data
    }
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function validate(str) {
    if (str && str != undefined && str != null) {
        return str
    }
    return ' '
}

Util.printJSON = (JSON) => {
    console.log('\n', JSON, '\n')
    logger.info(JSON)
}
//MESSAGES

Util.paypalErrorMessage = (modelName) => {
    return "The " + modelName.substring(0, modelName.length - 10).toUpperCase() + " need a PayPal ID, be different that null  or undefined."
}
Util.firebaseErrorMessage = (modelName) => {
    return "The " + modelName.substring(0, modelName.length - 10).toUpperCase() + " has been an error to send FirebaseNotification."
}
Util.requestErrorMessage = (modelName) => {
    return "The " + modelName.substring(0, modelName.length - 10).toUpperCase() + " need a resquest ID, be numeric and  greater than 0."
}
Util.collectorErrorMessage = (modelName) => {
    return "The " + modelName.substring(0, modelName.length - 10).toUpperCase() + " need a collector ID, be numeric and  greater than 0."
}
Util.defaultErrorMessage = (modelName) => {
    return "The " + modelName.substring(0, modelName.length - 10).toUpperCase() + " ID be numeric and  greater than 0."
}
Util.defaultMessage = (modelName) => {
    return "The " + modelName.substring(0, modelName.length - 10).toUpperCase() + " ID is not valid."
}
Util.notFoundMessage = (modelName) => {
    return modelName.substring(0, modelName.length - 10).toUpperCase() + " not found."
}

Util.catchErrorMessage = (modelName) => {
    return "The " + modelName.substring(0, modelName.length - 10).toUpperCase() + " ID is not valid."
}
Util.createMessage = (modelName, error) => {
    return "An error has occurred to create  new " + modelName.substring(0, modelName.length - 10).toUpperCase() + ' : ' + error
}
Util.readMessage = (modelName, error) => {
    return "An error has occurred to get  " + modelName.substring(0, modelName.length - 10).toUpperCase() + ' : ' + error
}
Util.updateMessage = (modelName, error) => {
    return "An error has occurred to update  " + modelName.substring(0, modelName.length - 10).toUpperCase() + ' : ' + error
}
Util.deleteMessage = (modelName, error) => {
    return "An error has occurred to delete  " + modelName.substring(0, modelName.length - 10).toUpperCase() + ' : ' + error
}



Util.parseDateFormat = function (fecha) {
    var newFecha = new Date(parseInt(fecha))
    return newFecha.getFullYear() + '-' + completa((newFecha.getMonth()) + 1) + '-' + completa(newFecha.getDate())
}

function DDMMYYYYDateFormat(fecha) {
    var newFecha = new Date(fecha)
    return completa(newFecha.getDate()) + '/' + completa((newFecha.getMonth()) + 1) + '/' + newFecha.getFullYear()
}

Util.dataValidation = function (res, data, controllerName) {
    if (data) {
        Util.message(res, data)
    } else {
        Util.message(res, data, Util.notFoundMessage(controllerName))
    }
}
Util.updateValidation = function (res, data, controllerName) {
    if (data && data > 0) {
        Util.message(res, 'The update was successfully.')
    } else {
        Util.updateMessage(controllerName, 'Error : update error.');
    }
}

Util.deleteValidation = function (res, data, controllerName) {
    if (data && data > 0) {
        Util.message(res, 'This was deleted successfully.')
    } else {
        Util.updateMessage(controllerName, 'Error : delete error.');
    }
}

Util.integerValidation = function (_id) {
    if (!isNaN(_id)) {
        if (_id && _id > 0) {
            return true
        }
    }
    return false
}


Util.integerIDValidation = function (res, _id, controllerName) {
    if (!isNaN(_id)) {
        if (_id && _id > 0) {
            return true
        }
    }
    Util.errorMessage(res, Util.defaultErrorMessage(controllerName), Util.defaultMessage(controllerName))
}
function completa(value) {
    if (value < 9) {
        return '0' + value
    }
    return value
}

module.exports = Util;

