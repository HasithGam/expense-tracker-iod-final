require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');
const incomeExpenseRoutes = require('./routes/incomeExpenseRoutes');
const app = express();


const PORT = process.env.PORT

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use('/api/income', incomeRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api', authRoutes);
app.use('/api', incomeExpenseRoutes);

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('You are listening to port:', PORT);
    })
}

server();