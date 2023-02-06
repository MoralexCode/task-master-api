'use strict';
const Sequelize = require('sequelize');
const dbModel = require('../app/models/index');
const DB = {};

DB.findOne = async (model, id) => {
	return await dbModel[model].findOne({where: {id, enable: 1}}).then(data => {
		return data;
	});
};
DB.findOneCustom = async (model, where, attributes) => {
	return await dbModel[model].findOne({where, attributes}).then(data => {
		return data;
	});
};
DB.findAll = async model => {
	return dbModel[model]
		.findAll({
			where: {enable: 1},
			attributes: {exclude: ['createdAt', 'updatedAt']}
		})
		.then(data => {
			return data;
		});
};
DB.findOneCustomQuery = async (model, query) => {
	return await dbModel[model].sequelize
		.query(query, {type: Sequelize.QueryTypes.SELECT})
		.then(data => {
			return data[0];
		});
};
DB.findAllCustomQuery = async (model, query) => {
	return await dbModel[model].sequelize
		.query(query, {
			type: Sequelize.QueryTypes.SELECT,
			attributes: {exclude: ['createdAt', 'updatedAt']}
		})
		.then(data => {
			return data;
		});
};

DB.update = async (model, paylod, id) => {
	return await dbModel[model]
		.update(paylod, {where: {id}})
		.then(([rowAffected, rowsUpdate, data]) => {
			return rowAffected;
		});
};

DB.create = async (model, paylod) => {
	return await dbModel[model].create(paylod).then(data => {
		return data;
	});
};
DB.bulkCreate = async (model, paylod) => {
	return await dbModel[model].bulkCreate(paylod).then(data => {
		return data;
	});
};
//Change the status, (logic deleted)
DB.delete = async (model, id) => {
	return await dbModel[model]
		.update({enable: 0}, {where: {id}})
		.then(([rowAffected, rowsUpdate, data]) => {
			return rowAffected;
		});
};
module.exports = DB;
