const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


// Loads all the env variables
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Setting up connection with MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully.")
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


// start server and listen at port 
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});