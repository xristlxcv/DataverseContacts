const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const contactRouter = require("./routes/contacts_router");



const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(cors());

app.use(express.json());
//Φορτωση βασης απο το .env αρχειο
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongo database success");
})

//Φοτρωση των routes
app.use("/contacts", contactRouter);


app.listen(port, () => {
    console.log(`Server is running on port:${port}`)
});
