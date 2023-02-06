const usersModel = 'task_master_users',
	usersController = {},
	DB = require('../../utils/dbFunctions'),
	Util = require('../../utils/util'),
	access_users = require('../../middleware/access_users'),
	encrypt = require('../../utils/encryptPassword');
const controllerName = 'usersController';
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|CREATE NEW users                                                                |
//|                                                                             |
//+-----------------------------------------------------------------------------+
usersController.create = async (req, res) => {
	try {
		const {body} = req;
		body.password = encrypt.getEncyptPassword(body.password);
		const data = await DB.create(usersModel, body);
		Util.dataValidation(res, data, controllerName);
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|FIND  users BY ID                                                          |
//|                                                                             |
//+-----------------------------------------------------------------------------+
usersController.read = async (req, res) => {
	try {
		const {id} = req.params;
		if (Util.integerIDValidation(res, id, controllerName)) {
			const data = await DB.findOne(usersModel, id);
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
//|GET LIST OF users CUSTOM QUERY                                            |
//|                                                                             |
//+-----------------------------------------------------------------------------+
usersController.readAll = async (req, res) => {
	try {
		const data = await DB.findAll(usersModel);
		Util.dataValidation(res, data, controllerName);
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|UPDATE   users  BY ID                                                       |
//|                                                                             |
//+-----------------------------------------------------------------------------+
usersController.update = async (req, res) => {
	const {id} = req.params;
	const payload = req.body;
	try {
		const data = await DB.update(usersModel, payload, id);
		Util.updateValidation(res, data, controllerName);
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|DELETE   users  BY ID                                                      |
//|                                                                             |
//+-----------------------------------------------------------------------------+
usersController.delete = async (req, res) => {
	const {id} = req.params;
	try {
		const data = await DB.delete(usersModel, id);
		Util.deleteValidation(res, data, controllerName);
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};

//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//| user LOGIN                                                                  |
//|                                                                             |
//+-----------------------------------------------------------------------------+
usersController.login = async (req, res) => {
	try {
		let {email, password, firebase_token} = req.body;
		log(controllerName, req.body);
		//logJSON(req.body)
		password = encrypt.getEncyptPassword(password);
		await validateUser(email, password, firebase_token, isUser => {
			if (isUser.value) {
				send(
					res,
					access_users.getToken({
						name: isUser.data.name,
						email: isUser.data.email,
						user_id: isUser.data.id,
						first_time: isUser.data.confirmed
					})
				);
			} else {
				sendError(res, 'No hay usuarios registrados con estas credenciales.');
			}
		}).catch(error => {
			log(controllerName, Util.readMessage(controllerName, error));
			sendError(res, error, Util.readMessage(controllerName, error));
		});
	} catch (error) {
		log(controllerName, Util.readMessage(controllerName, error));
		sendError(res, error, Util.readMessage(controllerName, error));
	}
};
//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|VALIDATE IF USER EXIST                                                       |
//|                                                                             |
//+-----------------------------------------------------------------------------+

const validateUser = async (email, password, firebase_token, func) => {
	const userFound = await findUser(email, password);
	if (userFound) {
		// await updateUser(userFound.email, firebase_token);
		return func({value: true, data: await findUser(email, password)});
	} else return func({value: false, data: null});
};

//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|UPDATE FIREBASE TOKEN AT  USER                                               |
//|                                                                             |
//+-----------------------------------------------------------------------------+
async function updateUser(email, firebase_token) {
	usersModel.update({firebase_token: firebase_token}, {where: {email}}).then(rowAffected => {
		if (rowAffected > 0)
			log(
				controllerName,
				'rowAffected | ' + rowAffected + ' Firebase token  User updated successfully.'
			);
		else
			log(
				controllerName,
				'rowAffected | ' + rowAffected + ' Firebase token  User updated Falied.'
			);
	});
}

//+-----------------------------------------------------------------------------+
//|                                                                             |
//|                                                                             |
//|FIND USER                                                                    |
//|                                                                             |
//+-----------------------------------------------------------------------------+
async function findUser(email, password) {
	const where = {email, password, enable: 1};
	const attributes = ['id', 'name', 'nickname', 'email', 'confirmed'];
	return await DB.findOneCustom(usersModel, where, attributes).then(user => {
		return user;
	});
	// .findOne({
	//   where: { email, password, enable: 1 },
	//   attributes: ["id", "name", "nickname", "email", "confirmed"],
	// })
}

module.exports = usersController;
