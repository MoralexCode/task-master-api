const supertest = require('supertest');
const assert = require('assert');
const {app, server} = require('../task-master');
const api = supertest(app);
const {credentials, contentType} = require('./helper');
const auth = {};
const project = {
	name: 'Personal',
	description: 'Todos mis proyectos personales van aqui'
};
//login to get auth token
beforeEach(async () => {
	await api
		.post('/api/v1/login')
		.send(credentials)
		.expect(200)
		.expect('Content-Type', contentType)
		.then(response => {
			auth.token = response.body.data.token;
		});
});

test('Create a new Project', async () => {
	await api
		.post('/api/v1/projects')
		.set('Authorization', auth.token)
		.send(project)
		.expect(200)
		.expect('Content-Type', contentType)
		.then(response => {
			assert(response.body.data.name, project.name);
			project.id = response.body.data.id;
		});
});
test('Get a  Project', async () => {
	await api
		.get('/api/v1/projects/' + project.id)
		.set('Authorization', auth.token)
		.expect(200)
		.expect('Content-Type', contentType)
		.then(response => {
			assert(response.body.data.name, project.name);
		});
});
test('Get all  Projects', async () => {
	await api
		.get('/api/v1/projects/')
		.set('Authorization', auth.token)
		.expect(200)
		.expect('Content-Type', contentType)
		.then(response => {});
});
test('Update a Project', async () => {
	await api
		.put('/api/v1/projects/' + project.id)
		.set('Authorization', auth.token)
		.send({name: 'Personal 2'})
		.expect(200)
		.expect('Content-Type', contentType)
		.then(response => {
			assert(response.body.data, 'The update was successfully.');
		});
});
test('Delete a Project', async () => {
	await api
		.delete('/api/v1/projects/' + project.id)
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
