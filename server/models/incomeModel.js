const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IncomeSchema = new Schema({
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
        default: "income"
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

}, {
    timestamps: true,
    collection: "incomes"
})

module.exports = mongoose.model("income", IncomeSchema);