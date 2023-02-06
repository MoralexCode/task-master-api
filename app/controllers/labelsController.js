const labelsModel = require('../Models/labelsModel'),
    labelsController = {},
    DB = require('../../utils/dbFunctions'),
Util = require('../../utils/util');
const controllerName = 'labelsController';
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|CREATE NEW labels                                                                |
//|                                                                             |
//+-----------------------------------------------------------------------------+
labelsController.create = async (req, res) => {
    let paylod = req.body;
    try {
        const data = await DB.create(labelsModel , paylod);
        Util.dataValidation(res, data, controllerName);
    } catch (error) {
        log(controllerName, Util.readMessage(controllerName, error));
        sendError(res, error, Util.readMessage(controllerName, error));
    }
}
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|FIND  labels BY ID                                                          |
//|                                                                             |
//+-----------------------------------------------------------------------------+
labelsController.read = async (req, res) => {
    try {
        const { id } = req.params;
        if (Util.integerIDValidation(res, id, controllerName)) {
            const data = await DB.findOne(labelsModel, id);
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
//|GET LIST OF labels CUSTOM QUERY                                            |
//|                                                                             |
//+-----------------------------------------------------------------------------+
labelsController.readAll = async (req, res) => {
    try {
        const data = await DB.findAll(labelsModel)
        Util.dataValidation(res, data, controllerName)
    } catch (error) {
        log(controllerName, Util.readMessage(controllerName, error));
        sendError(res, error, Util.readMessage(controllerName, error));
    }
}
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|UPDATE   labels  BY ID                                                       |
//|                                                                             |
//+-----------------------------------------------------------------------------+
labelsController.update = async (req, res) => {
    const { id } = req.params;
    const paylod = req.body;
    try {
        const data = await DB.update( labelsModel, paylod, id);
        Util.updateValidation(res, data, controllerName);
    } catch (error) {
        log(controllerName, Util.readMessage(controllerName, error));
        sendError(res, error, Util.readMessage(controllerName, error));
    }
}
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|DELETE   labels  BY ID                                                      |
//|                                                                             |
//+-----------------------------------------------------------------------------+
labelsController.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await DB.delete(labelsModel, id);
        Util.deleteValidation(res, data, controllerName);
    } catch (error) {
        log(controllerName, Util.readMessage(controllerName, error));
        sendError(res, error, Util.readMessage(controllerName, error));
    }
}
module.exports = labelsController; 
