const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const mysqlpool = require('./utils/db');
const appRoutes = require('./routes/appRoutes'); // Ensure this path is correct
const app = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

const port = process.env.PORT || 8000;

app.use(express.json());  
app.use(cors(corsOptions));  
app.use(morgan("dev"));

// Use appRoutes without parentheses
app.use('/', appRoutes); // Change this line to use appRoutes directly

// Check DB connection
mysqlpool
    .query('SELECT 1')
    .then(() => {
        console.log('DB Connected');
        app.listen(port, () => {
            console.log(`App is listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('DB connection failed:', err);
    });
