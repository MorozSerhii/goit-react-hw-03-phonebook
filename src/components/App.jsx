import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactText, Container, TitileContact } from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactsList/ContactList';
import { Filter } from './Filter/Filter';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = e => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: nanoid(), ...e }],
    }));
  };
  removeContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };
  Filter = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
  };

  render() {
    const filterContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter)
    );
    return (
      <Container
        initial={{ scale: 0.9, opacity: 0.2, y: -600 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Phonebook</h1>
        <ContactForm
          contacts={this.state.contacts}
          addContact={this.addContact}
        />
        <TitileContact>Contacts</TitileContact>
        <Filter filter={this.state.filter} change={this.Filter} />
        {filterContacts.length > 0 ? (
          <ContactList
            contacts={filterContacts}
            delContact={this.removeContact}
          />
        ) : (
          <ContactText>No contacts</ContactText>
        )}
      </Container>
    );
  }
}
