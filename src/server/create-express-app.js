const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiRouter = require('./api-router');

function createExpressApp(database){
    const app = express();
    app.use(express.static(path.join(__dirname, 'public')));
    // since we access the profile images by /profiles, we need to explicitly add as a static file on express
    app.use('/profiles', express.static(path.join(__dirname, 'profiles')));
    app.use(bodyParser.json());
    // middleware - routes
    app.use('/api', apiRouter(database));

    app.use('*', (req, res) => {
        return res.sendFile(path.join(__dirname, 'public/index.html'));
      });
    return app;
}
module.exports = createExpressApp;