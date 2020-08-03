const express = require('express');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');

const booksDetails = require('./routes/api/booksDetails');
const user = require('./routes/api/user');
const auth = require('./routes/api/auth');
const userShelf = require('./routes/api/userShelf');

const app = express();

//Middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false})
    .then(() => console.log('Yay!! MongoDB Connected'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/booksDetails', booksDetails);
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/userShelf',userShelf);

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server started on port no ${port}`));