import React, { Component } from "react";
import ContactsList from "./components/contacts";
import CreateContact from "./components/create_contact";
import axios from "axios";


class App extends Component {
  state = {
    contacts: []
  }
  //Τραβαω λες οι επαφες και τις αποθηκευω στον αδειο πινακα που ορισα στο state μου
  componentDidMount() {
    axios.get("http://localhost:5000/contacts")
      .then(res => {
        this.setState({ contacts: res.data })
      })
  }
  // Συναρτηση για να περασω μεσω props ωστε μολις πατησω add να μου εμφανισει αμεσως(realtime) την καινουργια επαφή
  updateContacts = () => {
    axios.get("http://localhost:5000/contacts")
      .then(res => {
        console.log(res.data)
        this.setState({ contacts: res.data })
      })
  }
  //Διαγραφη των επαφων με Raising and Handling Events. 
  deleteContacts = (id) => {
    axios.delete((`http://localhost:5000/contacts/${id}`))
      .then(res => console.log(res.data));
    this.setState({
      contacts: this.state.contacts.filter(el => el._id !== id)
    })

  }
  render() {
    //Για να κανω validation χρειαζομαι τα τηλεφωνα και τα μαιλς αντισοιχα...ετσι τα αποθκευω σε arrays και μετα
    // τα περναω μεσω props ωστε να κανω στο αντιστοιχο component το validation
    const emailArray = [];
    const phoneArray = [];
    this.state.contacts.map((data) => {
      emailArray.push(data.email);
      phoneArray.push(data.phone);
    })
    //Βαζω τα τηλεφωνα σε εναν μονο πινακα ωστε να ειναι ολα μαζι και περναω αυτον τον πινακα στα props
    var merged = [].concat.apply([], phoneArray);
    return (
      <div>
        <h1>Dataverse Project-Contacts</h1>
        <ContactsList contacts={this.state.contacts} onDelete={this.deleteContacts} updateContacts={this.updateContacts} />
        <CreateContact mailForValidation={emailArray} phonesForValidation={merged} updateContacts={this.updateContacts} />
      </div>
    );
  }


}

export default App;
