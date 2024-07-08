// 'use strict';
// const mongoose = require('mongoose');

// const uri = process.env.MONGO_URL;

// mongoose.connect(uri)
//     .then(() => console.log('MongoDB Connected'))
//     .catch(error => console.log('MongoDB Error:' + error.message));

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error: "));

// module.exports = mongoose;

const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB Connected!');
    } catch (error) {
        console.log('DB Connection Error:', error.message);
    }
};

module.exports = { db };
