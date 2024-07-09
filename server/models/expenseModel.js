const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    type: {
        type: String,
        default: "expense"
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        maxLength: 25,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },

}, { timestamps: true, collection: "expenses" })

module.exports = mongoose.model("expense", ExpenseSchema);