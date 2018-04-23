const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('./app/db/mongoose');
const app = express();
const session = require('express-session');
const DEFAULT_PORT = require('./app/constants/defaults').DEFAULT_PORT;
app.use(bodyParser.json());

const setMiddlewares = () => {
    require('./app/config/headerMiddleware')(app);    
}

const setMainRoutes = () => {
    require('./app/routes/index')(app);
}

setMiddlewares();
setMainRoutes();


app.listen(DEFAULT_PORT, () => {
    console.log(`Server running on port ${DEFAULT_PORT}`);
});
