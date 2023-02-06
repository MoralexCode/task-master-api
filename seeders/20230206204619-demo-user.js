'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		return queryInterface.bulkInsert(
			'task_master_users',
			[
				{
					name: 'Oscar',
					surname: 'Morale',
					nickname: 'MoralexCode',
					email: 'oscar@moralexcode.com',
					password:
						'7954bb45d815267325cb2baa7dc4e4c90d5f7ae9494e2e4ca774f73bb58e297a5a864a7531f1a2b4b874bff17a34bcd5f1bd15c512d78c01033d060f093b3bc6',
					confirmed: true,
					status: true,
					enable: true,
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('task_master_users', null, {});
	}
};
