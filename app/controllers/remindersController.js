const remindersModel = 'task_master_reminders',
	remindersController = {},
	DB = require('../../utils/dbFunctions'),
	Util = require('../../utils/util');
const controllerName = 'remindersController';
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|CREATE NEW reminders                                                                |
//|                                                                             |
//+-----------------------------------------------------------------------------+
remindersController.create = async (req, res) => {
	let payload = req.body;
	try {
		const data = await DB.create(remindersModel, payload);
		Util.dataValidation(res, data, controllerName);
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|FIND  reminders BY ID                                                          |
//|                                                                             |
//+-----------------------------------------------------------------------------+
remindersController.read = async (req, res) => {
	try {
		const {id} = req.params;
		if (Util.integerIDValidation(res, id, controllerName)) {
			const data = await DB.findOne(remindersModel, id);
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
//|GET LIST OF reminders CUSTOM QUERY                                            |
//|                                                                             |
//+-----------------------------------------------------------------------------+
remindersController.readAll = async (req, res) => {
	try {
		const data = await DB.findAll(remindersModel);
		Util.dataValidation(res, data, controllerName);
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|UPDATE   reminders  BY ID                                                       |
//|                                                                             |
//+-----------------------------------------------------------------------------+
remindersController.update = async (req, res) => {
	const {id} = req.params;
	const payload = req.body;
	try {
		const data = await DB.update(remindersModel, payload, id);
		Util.updateValidation(res, data, controllerName);
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|DELETE   reminders  BY ID                                                      |
//|                                                                             |
//+-----------------------------------------------------------------------------+
remindersController.delete = async (req, res) => {
	const {id} = req.params;
	try {
		const data = await DB.delete(remindersModel, id);
		Util.deleteValidation(res, data, controllerName);
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
module.exports = remindersController;
