import React, { Component } from "react";
import axios from "axios";



class CreateContact extends Component {
    state = {
        name: "",
        surname: "",
        email: "",
        address: "",
        phone: [],
        phone2: "",
        errMessage: ""
    }

    //Ελεγχος για το αν εχει συμπληρωσει την φορμα για τα απαιτουμενα στοιχεια και ενδειξη καταλληλου μηνυματος(Ειναι λιγο hard-coding!!!!!!!!!!)
    validationCheck = () => {
        if (this.state.name === "") {
            this.setState({ errMessage: "Name Is required" })
        } if (this.state.surname === "") {
            this.setState({ errMessage: "Surname Is required" })
        } if (this.state.email === "") {
            this.setState({ errMessage: "Email Is required" })
        }
        if (this.state.email === "" && this.state.name === "") {
            this.setState({ errMessage: "Email-Name Is required" })
        } if (this.state.email === "" && this.state.surname === "") {
            this.setState({ errMessage: "Email-Surname Is required" })
        } if (this.state.name === "" && this.state.surname === "") {
            this.setState({ errMessage: "Name-Surname Is required" })
        } if (this.state.email === "" && this.state.name === "" && this.state.surname === "") {
            this.setState({ errMessage: "Email-Name-Surname Is required" })
        }
    }


    //Ελεγχος για αν υπαρχει το τηλεφωνο.Mεσω των props που ειναι πινακας ελεγχω αν υπαρχει σε αυτην το τηλ καθως και αν ειναι αριθμος που εβαλε ο χρηστης 
    //και αν υπαρχει εμφανιζει το καταλληλο μηνυμα
    validPhone = () => {



        for (let i = 0; i <= this.props.phonesForValidation.length; i++) {
            if (this.props.phonesForValidation.includes(this.state.phone) === false) {
                this.setState({ errMessage: "Phone is already exists" })
            }
        }


        //Eλεγχος να ειναι αριθμος
        if (/^\d+$/.test(this.state.phone) === false) {
            this.setState({ errMessage: "Phone should be number" })
        }
    }
    //Ελεγχος για αν υπαρχει το email.Mεσω των props που ειναι πινακας ελεγχω αν υπαρχει σε αυτην το μαιλ που εβαλε ο χρηστης και αν υπαρχει εμφανιζει το καταλληλο μηνυμα
    validEmail = () => {
        console.log(this.state.mailValidation)
        if (this.props.mailForValidation.includes(this.state.email)) {
            this.setState({ errMessage: "Email is already exists" })
        }
    }



    //Καλω την μεθοδο Submit οταν ο χρηστης πατησει το κουμπι για να σταλουν τα δεδομενα,Επισης καλω τις μεθοδους validationCheck και validEmail για τον ελεγχο των δεδομενων
    Submit = e => {
        e.preventDefault();
        const contact = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            address: this.state.address,
            phone: [this.state.phone, this.state.phone2],


        }
        //καλω τα validations
        this.validEmail();
        this.validPhone();
        this.validationCheck();
        console.log(contact)
        //Δημιουρφια επαφης
        axios.post('http://localhost:5000/contacts/add', contact)
            .then(res => {
                console.log(res)
            //Aνανεωνω τις επαφες 
                this.props.updateContacts();
                this.setState({ errMessage: "" })
            }).catch(err => {
                console.log(err.response)


            })
        //αδιαζω τις μεταβλητες ωστε ο χρηστης μετα που θα πατησει το κουμπι να εχει μια νεα καθαρη φορμα
        this.setState({
            name: "",
            surname: "",
            email: "",
            address: "",
            phone: [],
            phone2: ""
        })
    }
    //Η φορμα μου με τα στοιχεια για συμπληρωμα
    render() {
        console.log(this.props.phonesForValidation)
        return (

            <div>
                <div id="form_syle" >
                    <form
                        onSubmit={this.Submit}
                    >
                        <div className="fieldCreate">
                            <label>Name:</label>
                            <input
                                type="text"
                                value={this.state.name}
                                onChange={e => this.setState({ name: e.target.value })}
                            />
                        </div>
                        <div className="fieldCreate">
                            <label>Surname:</label>
                            <input
                                type="text"
                                value={this.state.surname}
                                onChange={e => this.setState({ surname: e.target.value })}
                            />
                        </div>
                        <div className="fieldCreate">
                            <label>Email:</label>
                            <input
                                type="text"
                                value={this.state.email}
                                onChange={e => this.setState({ email: e.target.value })}
                            />
                        </div>
                        <div className="fieldCreate">
                            <label>Adress:</label>
                            <input
                                type="text"
                                value={this.state.address}
                                onChange={e => this.setState({ address: e.target.value })}
                            />
                        </div>
                        <div className="fieldCreate">
                            <label>Add Phone:</label>
                            <input
                                type="text"
                                value={this.state.phone}
                                onChange={e => this.setState({ phone: e.target.value })}
                            />
                        </div>
                        <div className="fieldCreate">
                            <label>Add Phone:</label>
                            <input
                                type="text"
                                value={this.state.phone2}
                                onChange={e => this.setState({ phone2: e.target.value })}
                            />
                        </div>

                        <button id="btn">+</button>
                    </form>
                </div>
                <h4 id="err">{this.state.errMessage}</h4>
            </div>

        );
    }



}

export default CreateContact;
