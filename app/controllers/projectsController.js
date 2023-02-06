const projectsModel = 'task_master_projects',
	projectsController = {},
	DB = require('../../utils/dbFunctions'),
	Util = require('../../utils/util');
const controllerName = 'projectsController';
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|CREATE NEW projects                                                                |
//|                                                                             |
//+-----------------------------------------------------------------------------+
projectsController.create = async (req, res) => {
	try {
		const {body} = req;
		// const data = await DB.create(projectsModel, paylod);
		const data = await DB.create(projectsModel, body);
		Util.dataValidation(res, data, controllerName);
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|FIND  projects BY ID                                                          |
//|                                                                             |
//+-----------------------------------------------------------------------------+
projectsController.read = async (req, res) => {
	try {
		const {id} = req.params;
		if (Util.integerIDValidation(res, id, controllerName)) {
			const data = await DB.findOne(projectsModel, id);
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
//|GET LIST OF projects CUSTOM QUERY                                            |
//|                                                                             |
//+-----------------------------------------------------------------------------+
projectsController.readAll = async (req, res) => {
	try {
		const data = await DB.findAll(projectsModel);
		Util.dataValidation(res, data, controllerName);
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|UPDATE   projects  BY ID                                                       |
//|                                                                             |
//+-----------------------------------------------------------------------------+
projectsController.update = async (req, res) => {
	const {id} = req.params;
	const paylod = req.body;
	try {
		const data = await DB.update(projectsModel, paylod, id);
		Util.updateValidation(res, data, controllerName);
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|DELETE   projects  BY ID                                                      |
//|                                                                             |
//+-----------------------------------------------------------------------------+
projectsController.delete = async (req, res) => {
	const {id} = req.params;
	try {
		const data = await DB.delete(projectsModel, id);
		Util.deleteValidation(res, data, controllerName);
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
module.exports = projectsController;
