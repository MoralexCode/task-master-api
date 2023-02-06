const filtersModel = require('../Models/filtersModel'),
    filtersController = {},
    DB = require('../../utils/dbFunctions'),
Util = require('../../utils/util');
const controllerName = 'filtersController';
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|CREATE NEW filters                                                                |
//|                                                                             |
//+-----------------------------------------------------------------------------+
filtersController.create = async (req, res) => {
    let paylod = req.body;
    try {
        const data = await DB.create(filtersModel , paylod);
        Util.dataValidation(res, data, controllerName);
    } catch (error) {
        log(controllerName, Util.readMessage(controllerName, error));
        sendError(res, error, Util.readMessage(controllerName, error));
    }
}
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|FIND  filters BY ID                                                          |
//|                                                                             |
//+-----------------------------------------------------------------------------+
filtersController.read = async (req, res) => {
    try {
        const { id } = req.params;
        if (Util.integerIDValidation(res, id, controllerName)) {
            const data = await DB.findOne(filtersModel, id);
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
//|GET LIST OF filters CUSTOM QUERY                                            |
//|                                                                             |
//+-----------------------------------------------------------------------------+
filtersController.readAll = async (req, res) => {
    try {
        const data = await DB.findAll(filtersModel)
        Util.dataValidation(res, data, controllerName)
    } catch (error) {
        log(controllerName, Util.readMessage(controllerName, error));
        sendError(res, error, Util.readMessage(controllerName, error));
    }
}
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|UPDATE   filters  BY ID                                                       |
//|                                                                             |
//+-----------------------------------------------------------------------------+
filtersController.update = async (req, res) => {
    const { id } = req.params;
    const paylod = req.body;
    try {
        const data = await DB.update( filtersModel, paylod, id);
        Util.updateValidation(res, data, controllerName);
    } catch (error) {
        log(controllerName, Util.readMessage(controllerName, error));
        sendError(res, error, Util.readMessage(controllerName, error));
    }
}
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|DELETE   filters  BY ID                                                      |
//|                                                                             |
//+-----------------------------------------------------------------------------+
filtersController.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await DB.delete(filtersModel, id);
        Util.deleteValidation(res, data, controllerName);
    } catch (error) {
        log(controllerName, Util.readMessage(controllerName, error));
        sendError(res, error, Util.readMessage(controllerName, error));
    }
}
module.exports = filtersController; 
