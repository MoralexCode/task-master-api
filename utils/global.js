'use strict';
const savelog = require('./logger');
var title = '\x1b[44m%s\x1b[0m';
var text = '\x1b[33m%s\x1b[4m';
var print = (controllerName, mensaje) => {
	var string1 = '\n' + validString(controllerName);
	var string2 = validString(JSON.stringify(mensaje));
	console.log(string1, string2 != ' ' ? ' | ' + string2 + '\n' : string2);
};
var log = (controllerName, mensaje) => {
	var string1 = validString(controllerName);
	var string2 = validString(JSON.stringify(mensaje));
	console.log('\n' + string1, string2 != ' ' ? ' | ' + string2 + '\n' : string2);
	savelog.info(string2 != ' ' ? string1 + ' | ' + string2 : string1);
};
var logJSON = json => {
	console.table(json);
};
var DataBaseError = (controllerName, mensaje) => {
	this.error = 'DataBaseError';
	this.nombre = controllerName;
	this.mensaje = mensaje;
};
var logger = out => {
	savelog.info(out);
};
function validString(str) {
	if (str && str != undefined && str != null) {
		return str;
	}
	return ' ';
}

var JSON2String = data => {
	if (IsJsonString(data)) {
		return JSON.stringify(data);
	} else {
		return data;
	}
};

function IsJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		console.log(e.message);
		return false;
	}
	return true;
}

var safeExecution = async (controllerName, req, res, cb) => {
	//    const style = 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)';
	//    console.log('%c Rainbowww!', style);
	//    console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
	//    console.log("\x1b[33m%s\x1b[0m", "I Am Using Yellow");
	//    console.log("\x1b[44m%s\x1b[0m", "Background Color Is Blue");
	try {
		await cb(req, res);
	} catch (e) {
		initDecoration(title, controllerName);
		console.group('Error Message');
		console.log('\n');
		console.log(e.message);
		logger('Error Message');
		logger(e.message);
		console.log('\n');
		console.group('Error Trace');
		console.log('\n');
		console.log(e);
		console.groupEnd('Error Trace');
		console.groupEnd('Error Message');
		console.log('We managed to catch the error.');
		endDecoration(title, controllerName);
		sendError(res, e.message, 'We have internal error, please contact Engeenier Oscar Morales');
	}
};
function initDecoration(style, name) {
	console.log(
		style,
		'=======================| Start SafeExecution => ' +
			validString(name) +
			' ' +
			' |============================='
	);
}

function endDecoration(style, name) {
	console.log(
		style,
		'=======================| End SafeExecution => ' +
			validString(name) +
			' |============================='
	);
}
var send = (respuesta, data, message, codeResponse) => {
	respuesta.status(codeResponse || 200).send({
		codeResponse,
		data,
		message,
		successfull: true
	});
};

var sendError = (respuesta, data, message, codeResponse) => {
	console.log('Error values | ', data);
	respuesta.status(codeResponse || 500).send({
		codeResponse,
		data,
		message,
		successfull: false
	});
};
const info = console.info;

module.exports = global.print = print;
module.exports = global.safeExecution = safeExecution;
//module.exports = global.safeAsyncExecution = safeAsyncExecution;
module.exports = global.send = send;
module.exports = global.sendError = sendError;
module.exports = global.log = log;
module.exports = global.logJSON = logJSON;
module.exports = global.logger = logger;
module.exports = global.DataBaseError = DataBaseError;
module.exports = global.info = info;
