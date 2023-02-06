const configsModel = require('../Models/configsModel'),
    configsController = {},
    DB = require('../../utils/dbFunctions'),
Util = require('../../utils/util');
const controllerName = 'configsController';
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|CREATE NEW configs                                                                |
//|                                                                             |
//+-----------------------------------------------------------------------------+
configsController.create = async (req, res) => {
    let paylod = req.body;
    try {
        const data = await DB.create(configsModel , paylod);
        Util.dataValidation(res, data, controllerName);
    } catch (error) {
        log(controllerName, Util.readMessage(controllerName, error));
        sendError(res, error, Util.readMessage(controllerName, error));
    }
}
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|FIND  configs BY ID                                                          |
//|                                                                             |
//+-----------------------------------------------------------------------------+
configsController.read = async (req, res) => {
    try {
        const { id } = req.params;
        if (Util.integerIDValidation(res, id, controllerName)) {
            const data = await DB.findOne(configsModel, id);
            Util.dataValidation(res, data, controllerName);
        }
    } catch (error) {
        log(controllerName, Util.readMessage(controllerName, error));
        sendError(res, error, Util.readMessage(controllerName, error));
    }
}
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|GET LIST OF configs CUSTOM QUERY                                            |
//|                                                                             |
//+-----------------------------------------------------------------------------+
configsController.readAll = async (req, res) => {
    try {
        const data = await DB.findAll(configsModel)
        Util.dataValidation(res, data, controllerName)
    } catch (error) {
        log(controllerName, Util.readMessage(controllerName, error));
        sendError(res, error, Util.readMessage(controllerName, error));
    }
}
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|UPDATE   configs  BY ID                                                       |
//|                                                                             |
//+-----------------------------------------------------------------------------+
configsController.update = async (req, res) => {
    const { id } = req.params;
    const paylod = req.body;
    try {
        const data = await DB.update( configsModel, paylod, id);
        Util.updateValidation(res, data, controllerName);
    } catch (error) {
        log(controllerName, Util.readMessage(controllerName, error));
        sendError(res, error, Util.readMessage(controllerName, error));
    }
}
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|DELETE   configs  BY ID                                                      |
//|                                                                             |
//+-----------------------------------------------------------------------------+
configsController.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await DB.delete(configsModel, id);
        Util.deleteValidation(res, data, controllerName);
    } catch (error) {
        log(controllerName, Util.readMessage(controllerName, error));
        sendError(res, error, Util.readMessage(controllerName, error));
    }
}
module.exports = configsController; 
