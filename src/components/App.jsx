import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactText, Container, TitileContact } from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactsList/ContactList';
import { Filter } from './Filter/Filter';

const LS_KEY = 'contacts';
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

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem(LS_KEY));
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
    }
  }
  addContact = e => {
    this.setState(prevState => ({
      contacts: [{ id: nanoid(), ...e }, ...prevState.contacts],
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
    const { value } = e.target;
    this.setState({ filter: value.toLowerCase() });
  };

  render() {
    const contacts = this.state.contacts;
    const filter = this.state.filter;
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
    return (
      <Container
        initial={{ scale: 0.9, opacity: 0.2, y: -600 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} addContact={this.addContact} />
        <TitileContact>Contacts</TitileContact>
        <Filter filter={filter} change={this.Filter} />
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
