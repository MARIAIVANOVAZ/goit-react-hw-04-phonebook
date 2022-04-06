import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './СontactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  // state = {
  //   contacts: [
  //     // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  const addContact = newContact => {
    console.log(newContact);
    const contact = {
      id: nanoid(),
      name: newContact.name,
      number: newContact.number,
    };
    // console.log(contact);
    contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? alert(`${contact.name} is already in contacts`)
      : setContacts([contact, ...contacts]);
  };

  const onFilterChange = e => {
    // console.log(e.currentTarget.value);
    setFilter(e.currentTarget.value);
  };

  const getFilteredContact = () => {
    // const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };
  useEffect(() => {
    const contacts = localStorage.getItem('contacts');

    if (contacts) {
      const parsedContacts = JSON.parse(contacts);
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    // console.log('App component did update');
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // useEffect(() => {
  //   const contacts = localStorage.getItem('contacts');

  //   if (contacts) {
  //     const parsedContacts = JSON.parse(contacts);
  //     setContacts(parsedContacts);
  //   }
  // }, []);
  // componentDidUpdate(prevState) {
  //   console.log('App component did update');
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }
  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);
  //   if (parsedContacts) {
  //     this.setState(prevState => ({
  //       contacts: parsedContacts,
  //       ...prevState.contacts,
  //     }));
  //     // this.setState({ contacts: parsedContacts, ...contacts });
  //   }
  // }

  const filteredContact = getFilteredContact();
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact}></ContactForm>
      <h2> Contacts</h2>
      <ContactList
        contacts={filteredContact}
        onDelete={deleteContact}
      ></ContactList>
      <Filter value={filter} onChange={onFilterChange}></Filter>
    </div>
  );
}
