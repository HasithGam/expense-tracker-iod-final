require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const transaction = require('./routes/transactions');
const app = express();


const PORT = process.env.PORT

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use('/api', transaction);

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('You are listening to port:', PORT);
    })
}

server();