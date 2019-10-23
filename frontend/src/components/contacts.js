import React, { Component } from "react";
import EditContact from "./edit_contacts";



class ContactsList extends Component {


    render() {
        return (
            <div>
                {/* Eνα loop για να εμφανισω τις επαφες και μεσω jsx βαζω τα δεδομενα μου σε ενα table*/}
                {this.props.contacts.map(el => (

                    < table id={el._id} width="1000"  >

                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone1</th>
                            <th>Phone 2</th>
                        </tr>
                        <tr>

                            <td>{el.name}</td>
                            <td>{el.surname}</td>
                            <td>{el.email}</td>
                            <td>{el.address}</td>
                            <td>{el.phone[0]}</td>
                            <td>{el.phone[1]}</td>

                        </tr>

                        {/* Φορτωνω τo EditComponent  ωστε να του περασω μεσω props καποιες ιδιοτητες των επαφων μου και για αυτο ειναι μεσα στο map */}
                        < EditContact updateContacts={this.props.updateContacts} id={el._id} phone={el.phone} name={el.name} surname={el.surname} email={el.email} address={el.address} />
                        <button id="btn_del" onClick={() => { if (window.confirm('Are you sure to delete this record?')) this.props.onDelete(el._id) }}>Delete</button>

                    </table>

                ))}

            </div>
        );
    }



}

export default ContactsList;
