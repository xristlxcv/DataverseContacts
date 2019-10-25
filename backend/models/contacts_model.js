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
        trim: true
        unique: true,
    },
    address: {
        type: String
    },
// θέλω να περνάει null τιμές και τάυτοχρονα να είναι unique ώστε να μην βγάζει error σε περίπτωση διπλου null

     phone: [{
        type: Number,
        index: {
            unique: true,
            partialFilterExpression: { phone: { $type: "number" } }
        },
        set: v => (v === "" ? null : v)
    }]
});

module.exports = mongoose.model("Contact", contactSchema);
