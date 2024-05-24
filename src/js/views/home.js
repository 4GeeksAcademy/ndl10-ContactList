import React, { useState, useEffect, useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import Deleter from "../../img/tinker.png"


export const Home = () => {
  const { store, actions } = useContext(Context);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedContact, setEditedContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  useEffect(() => {
    actions.getUser("ndl10");
    actions.getContacts("ndl10");
  }, []);

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setEditedContact({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      address: contact.address
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedContact(null);
    setEditedContact({
      name: "",
      phone: "",
      email: "",
      address: ""
    });
  };

  const handleSaveChanges = () => {
    const userId = store.user; 
    const { id: contactId } = selectedContact; 
    actions.editContact(userId, contactId, editedContact)
      .then(() => {
        handleCloseModal();
        actions.getContacts("ndl10"); 
      })
      .catch(error => {
        console.error("Error al editar el contacto:", error);
        
      });
  };

  const handleDeleteContact = (contactId) => {
    actions.deleteContact(contactId);
  };

  if (!(store.contacts && store.contacts.contacts)) return null;

  return (
    <div className="mt-5">
      <div>
        <h1 className="text-center m-4"> Contact List </h1>

        {store.contacts.contacts.map((item) => (
          <div className="card mb-0" key={item.id} style={{ width: "auto", margin: "auto", maxWidth: "70%" }}>
            <div className="row align-items-center">
              <div className="col-md-1">
                
              </div>
              <div className="col-md-9">
                <div className="card-body">
                  <h3 className="card-title">Name: {item.name}</h3>
                  <p className="card-text">Address: {item.address}</p>
                  <p className="card-text">Phone: {item.phone}</p>
                  <p className="card-text">Email: {item.email}</p>
                </div>
              </div>
              <div className="col-md-2">
                <button type="button" className="btn btn-secondary m-1" onClick={() => handleEditContact(item)}>Edit</button>
                <button type="button" className="btn btn-danger m-1" onClick={() => handleDeleteContact(item.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

     
      {selectedContact && (
        <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Contact</h5>
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" className="form-control" id="name" value={editedContact.name} onChange={(e) => setEditedContact({ ...editedContact, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input type="text" className="form-control" id="phone" value={editedContact.phone} onChange={(e) => setEditedContact({ ...editedContact, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">email:</label>
                  <input type="email" className="form-control" id="email" value={editedContact.email} onChange={(e) => setEditedContact({ ...editedContact, email: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input type="text" className="form-control" id="address" value={editedContact.address} onChange={(e) => setEditedContact({ ...editedContact, address: e.target.value })} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={handleSaveChanges}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;