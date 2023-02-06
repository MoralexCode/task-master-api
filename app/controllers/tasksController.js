const tasksModel = 'task_master_tasks',
	tasksController = {},
	DB = require('../../utils/dbFunctions'),
	Util = require('../../utils/util'),
	mail = require('../../utils/mailer');
const controllerName = 'tasksController';
const {EMAIL} = process.env;
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|CREATE NEW tasks                                                                |
//|                                                                             |
//+-----------------------------------------------------------------------------+
tasksController.create = async (req, res) => {
	let paylod = req.body;
	try {
		const data = await DB.create(tasksModel, paylod);
		await mail.sendMail(EMAIL);
		Util.dataValidation(res, data, controllerName);
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|FIND  tasks BY ID                                                          |
//|                                                                             |
//+-----------------------------------------------------------------------------+
tasksController.read = async (req, res) => {
	try {
		const {id} = req.params;
		if (Util.integerIDValidation(res, id, controllerName)) {
			const data = await DB.findOne(tasksModel, id);
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
//|GET LIST OF tasks CUSTOM QUERY                                            |
//|                                                                             |
//+-----------------------------------------------------------------------------+
tasksController.readAll = async (req, res) => {
	try {
		const data = await DB.findAll(tasksModel);
		Util.dataValidation(res, data, controllerName);
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|UPDATE   tasks  BY ID                                                       |
//|                                                                             |
//+-----------------------------------------------------------------------------+
tasksController.update = async (req, res) => {
	const {id} = req.params;
	const paylod = req.body;
	try {
		const data = await DB.update(tasksModel, paylod, id);
		Util.updateValidation(res, data, controllerName);
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|DELETE   tasks  BY ID                                                      |
//|                                                                             |
//+-----------------------------------------------------------------------------+
tasksController.delete = async (req, res) => {
	const {id} = req.params;
	try {
		const data = await DB.delete(tasksModel, id);
		Util.deleteValidation(res, data, controllerName);
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
module.exports = tasksController;
