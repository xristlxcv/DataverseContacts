const router = require("express").Router();
let Contact = require("../models/contacts_model");

//Ολες οι επαφες
router.route("/").get((req, res) => {
    Contact.find()
        .then(contacts => res.json(contacts))
        .catch(err => res.status(400).json("Error: " + err));
})
//Επαφη με συγκεκριμενο id
router.route("/:id").get((req, res) => {
    Contact.findById(req.params.id)
        .then(contacts => res.json(contacts))
        .catch(err => res.status(400).json("Error: " + err));
})
//Προσθηκη επαφης
router.route("/add").post((req, res) => {

    const { name, surname, email, address, phone } = req.body;
    const newContact = new Contact({
        name, surname, email, address, phone
    })
    newContact.save()
        .then(() => res.json("User added!"))
        .catch(err =>
            res.status(400).json("Error: " + err));
})
//Διαγραφη επαφης
router.route("/:id").delete((req, res) => {
    Contact.findByIdAndDelete(req.params.id)
        .then(() => res.json("Contact deleted"))
        .catch(err => res.status(400).json("Error: " + err));
})
//Ανανεωση επαφης
router.route("/update/:id").put((req, res) => {
    Contact.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone
        }
    })
        .then(() => res.json("Contact Updated"))
        .catch(err => res.status(400).json("Error: " + err));
})


module.exports = router;
