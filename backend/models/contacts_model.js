const mongoose = require('mongoose');

//Δημιουργια του scheme
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String
    },
    phone: [{
        type: Number,
        index: {
            unique: true,
            partialFilterExpression: { phone: { $type: "string" } },
        },
        default: null
    }]
});

module.exports = mongoose.model("Contact", contactSchema);
