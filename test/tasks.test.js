const supertest = require('supertest');
const assert = require('assert');
const {app, server} = require('../task-master');
const api = supertest(app);
const {credentials, contentType} = require('./helper');
const auth = {};
//login to get auth token
beforeEach(async () => {
	await api
		.post('/api/v1/login')
		.send(credentials)
		.expect(200)
		.expect('Content-Type', contentType)
		.then(response => {
			auth.token = response.body.data.token;
			//   assert(response.body.data.mensaje, "Correct authentication");
		});
});

test('List tasks without token', async () => {
	await api.get('/api/v1/tasks').expect(401);
});

test('List all tasks', async () => {
	await api
		.get('/api/v1/tasks')
		.set('Authorization', auth.token)
		.expect(200)
		.expect('Content-Type', contentType);
});

test('Create a task', async () => {
	const task = {
		title: 'Volar DRON con JADEN',
		description: 'Ir al parque a volr el dron de Jaden',
		when: '2022-10-30 17:40:20'
	};
	await api
		.post('/api/v1/tasks')
		.set('Authorization', auth.token)
		.send(task)
		.expect(200)
		.expect('Content-Type', contentType)
		.then(response => {
			assert(response.body.data.title, task.title);
		});
});

test('Create a task with project id', async () => {
	const project = {
		name: 'Personal',
		description: 'Todos mis proyectos personales van aqui'
	};
	const project_id = await api
		.post('/api/v1/projects')
		.set('Authorization', auth.token)
		.send(project)
		.expect(200)
		.expect('Content-Type', contentType)
		.then(response => {
			return response.body.data.id;
		});
	const task = {
		title: 'Volar DRON con JADEN',
		description: 'Ir al parque a volr el dron de Jaden',
		when: '2022-10-30 17:40:20',
		project_id
	};
	await api
		.post('/api/v1/tasks')
		.set('Authorization', auth.token)
		.send(task)
		.expect(200)
		.expect('Content-Type', contentType)
		.then(response => {
			assert(response.body.data.title, task.title);
		});
});

test('Create a task with project id and reminder id ', async () => {
	const reminder = {
		interval: {
			time: '80:30 AM',
			start: '2022-10-29',
			end: '2222-10-29',
			each: 'day'
		}
	};
	const reminder_id = await api
		.post('/api/v1/reminders')
		.set('Authorization', auth.token)
		.send(reminder)
		.expect(200)
		.expect('Content-Type', contentType)
		.then(response => {
			return response.body.data.id;
		});
	const project = {
		name: 'Trabajo',
		description: 'Todos mis proyectos de trabajo van aqui'
	};
	const project_id = await api
		.post('/api/v1/projects')
		.set('Authorization', auth.token)
		.send(project)
		.expect(200)
		.expect('Content-Type', contentType)
		.then(response => {
			return response.body.data.id;
		});
	const task = {
		title: 'Volar DRON con JADEN',
		description: 'Ir al parque a volar el dron de Jaden',
		when: '2022-10-30 17:40:20',
		project_id,
		reminder_id
	};
	await api
		.post('/api/v1/tasks')
		.set('Authorization', auth.token)
		.send(task)
		.expect(200)
		.expect('Content-Type', contentType)
		.then(response => {
			assert(response.body.data.title, task.title);
		});
});

test('Update a task /:id', async () => {
	const task = {
		title: 'Ir al cine',
		description: 'con mis familia y pedir un combo de palomitas',
		when: '2022-10-31 17:40:20'
	};
	const task_id = await api
		.post('/api/v1/tasks')
		.set('Authorization', auth.token)
		.send(task)
		.expect(200)
		.expect('Content-Type', contentType)
		.then(response => {
			return response.body.data.id;
		});
	await api
		.put('/api/v1/tasks/' + task_id)
		.set('Authorization', auth.token)
		.send({description: 'con mi familia y pedir un combo nachos'})
		.expect(200)
		.expect('Content-Type', contentType)
		.then(response => {
			assert(response.body.data, 'The update was successfully.');
		});
});

test('Delete a task /:id', async () => {
	const task = {
		title: 'Ver una pelicula',
		description: 'Los piratas de sillicon valley',
		when: '2022-10-31 17:40:20'
	};
	const task_id = await api
		.post('/api/v1/tasks')
		.set('Authorization', auth.token)
		.send(task)
		.expect(200)
		.expect('Content-Type', contentType)
		.then(response => {
			return response.body.data.id;
		});
	await api
		.delete('/api/v1/tasks/' + task_id)
		.set('Authorization', auth.token)
		.expect(200)
		.expect('Content-Type', contentType)
		.then(response => {
			assert(response.body.data, 'This was deleted successfully.');
		});
});

afterEach(async () => {
	await server.close();
});
