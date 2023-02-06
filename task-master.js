require('dotenv').config();
require('./utils/global'); //load global.js to add new functions to Global enviroment
const express = require('express'),
	app = express();
const cors = require('cors');
const pkg = require('./package.json');
const {cyan} = require('chalk');
const {PORT, HOST} = process.env; // GET environment variables
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json({limit: '100mb'}));
const boxen = require('boxen');
//============ add Routes ===================
//===========================================
var routes = require('./app/routes/index');
app.use('/api', routes);

// function run() {
const server = app.listen(PORT || 3000, () => {
	const appName = pkg.name;
	info(
		boxen(
			`👂Listening at http://${HOST}:${PORT}/\n[DB] Conectada con éxito  \n🔥  ${cyan(
				` Learn, develop, enjoy, repeat  `
			)}😎 `,

			{
				title: appName,
				titleAlignment: 'center',
				borderStyle: 'double'
			}
		)
	);
});
// }
module.exports = {app, server};
// safeExecution('Main', null, null, run);
