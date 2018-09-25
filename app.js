const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movie');
const actorRoutes = require('./routes/actor');
const categoryRoutes = require('./routes/category');

const app = express();

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());

app.use('/api/auth', authRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api/actor', actorRoutes);
app.use('/api/category', categoryRoutes);

module.exports = app;