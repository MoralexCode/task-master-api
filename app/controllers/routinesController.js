const routinesModel = 'task_master_routines',
	routinesController = {},
	DB = require('../../utils/dbFunctions'),
	Util = require('../../utils/util');
const controllerName = 'routinesController';
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|CREATE NEW routines                                                                |
//|                                                                             |
//+-----------------------------------------------------------------------------+
routinesController.create = async (req, res) => {
	let paylod = req.body;
	try {
		const data = await DB.create(routinesModel, paylod);
		Util.dataValidation(res, data, controllerName);
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|FIND  routines BY ID                                                          |
//|                                                                             |
//+-----------------------------------------------------------------------------+
routinesController.read = async (req, res) => {
	try {
		const {id} = req.params;
		if (Util.integerIDValidation(res, id, controllerName)) {
			const data = await DB.findOne(routinesModel, id);
			Util.dataValidation(res, data, controllerName);
		}
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|GET LIST OF routines CUSTOM QUERY                                            |
//|                                                                             |
//+-----------------------------------------------------------------------------+
routinesController.readAll = async (req, res) => {
	try {
		const data = await DB.findAll(routinesModel);
		Util.dataValidation(res, data, controllerName);
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|UPDATE   routines  BY ID                                                       |
//|                                                                             |
//+-----------------------------------------------------------------------------+
routinesController.update = async (req, res) => {
	const {id} = req.params;
	const paylod = req.body;
	try {
		const data = await DB.update(routinesModel, paylod, id);
		Util.updateValidation(res, data, controllerName);
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|DELETE   routines  BY ID                                                      |
//|                                                                             |
//+-----------------------------------------------------------------------------+
routinesController.delete = async (req, res) => {
	const {id} = req.params;
	try {
		const data = await DB.delete(routinesModel, id);
		Util.deleteValidation(res, data, controllerName);
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
module.exports = routinesController;
