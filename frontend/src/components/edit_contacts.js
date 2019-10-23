import React, { Component } from "react";
import axios from "axios";



class EditContact extends Component {
    //περναω στο state τα props μου ωστε να δειχνουν τις default τιμες που εχει δωσει ο χρηστης 
    state = {
        name: this.props.name,
        surname: this.props.surname,
        email: this.props.email,
        address: this.props.address,
        //o πινακας ολων των τηλ
        phone: this.props.phone,
        //χωριζω τα τηλ ωστε στην φορμα στο πεδιο value να αντιστοιχεί το καθενα σε ενα και να γινει overide με την τιμη του χρηστη
        phone2: this.props.phone[1],
        phone1: this.props.phone[0],
        edit: "false"
    }
    //Ελεγχει αν πρεπει να ειναι σε edit mode
    formEdit = id => {
        this.setState({ edit: true });
    }
    // Ακυρωση του edit
    cancelBtn = () => {
        this.setState({ edit: false })
    }
    //Υποβολη του edit και στελνει τα δεδομενα στην βαση ωστε να γινουν update
    Submit = e => {
        e.preventDefault();
        const contact = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            address: this.state.address,
            phone: [this.state.phone1, this.state.phone2]
        }

        axios.put(`http://localhost:5000/contacts/update/${this.props.id}`, contact)
            .then(res => {
                console.log(res.data)
                this.props.updateContacts();
            })

        this.setState({ edit: false });
    }
    render() {
        console.log(this.props.phone1)
        return (
            <div>
                <button id="btn_edit" onClick={() => this.formEdit(this.props.id)}>Edit</button>
                {/* {/* ελεγχος με tenary operator αν ειναι σε edit mode η οχi .Aν ναι εμφανισε την φορμα αλλιως null   */}
                {this.state.edit === true ? <div>
                    <form
                        onSubmit={this.Submit}
                    >
                        <div className="field">
                            <label>Name:</label>
                            <input
                                type="text"
                                value={this.state.name}
                                onChange={e => this.setState({ name: e.target.value })}
                            />
                        </div>
                        <div className="field">
                            <label>Surname:</label>
                            <input
                                type="text"
                                value={this.state.surname}
                                onChange={e => this.setState({ surname: e.target.value })}
                            />
                        </div>
                        <div className="field">
                            <label>Email:</label>
                            <input
                                type="text"
                                value={this.state.email}
                                onChange={e => this.setState({ email: e.target.value })}
                            />
                        </div>
                        <div className="field">
                            <label>Adress:</label>
                            <input
                                type="text"
                                value={this.state.address}
                                onChange={e => this.setState({ address: e.target.value })}
                            />
                        </div>
                        <div className="field">
                            <label>Phone:</label>
                            <input
                                type="text"
                                value={this.state.phone1}
                                onChange={e => this.setState({ phone1: e.target.value })}
                            />
                        </div>
                        <div className="field">
                            <label>Phone:</label>
                            <input
                                type="text"
                                value={this.state.phone2}
                                onChange={e => this.setState({ phone2: e.target.value })}
                            />
                        </div>
                        <button>OK</button>
                        <button onClick={this.cancelBtn}>Cancel</button>
                    </form>
                </div> : null}
            </div>
        );
    }



}

export default EditContact;
