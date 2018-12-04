const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movie');
const actorRoutes = require('./routes/actor');
const categoryRoutes = require('./routes/category');
const userRoutes = require('./routes/user');
const voteRoutes = require('./routes/vote');
const keys = require('./config/keys');

const app = express();

mongoose.set('useCreateIndex', true);
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
    .then(() => console.log("Mongo DB connected"))
    .catch((err) => console.log(err));

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('morgan')('dev'));
app.use('/uploads', express.static('uploads'));
app.use(require('cors')());

app.use('/api/auth', authRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api/admin/movie', movieRoutes);
app.use('/api/actor', actorRoutes);
app.use('/api/admin/actor', actorRoutes);
app.use('/api/admin/category', categoryRoutes);
app.use('/api/admin/user', userRoutes);
app.use('/api/vote', voteRoutes);

module.exports = app;