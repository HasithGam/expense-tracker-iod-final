const express = require('express');
const router = express.Router();
let Controllers = require("../controllers");


// router.get('/users', (req, res) => {
//     Controllers.Expenses.getExpense(res);
// })
router.post('/login', (req, res) => {
    Controllers.loginUser.login(req, res);
});

module.exports = router;