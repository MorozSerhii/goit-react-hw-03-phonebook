import { Component } from 'react';
import { Btn, Form, InputName, Label } from './ContactForm.styled';
import PropTypes from 'prop-types';
export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.props.contacts.find(contact => contact.name === this.state.name)) {
      window.alert(`Contact ${this.state.name} is already in contacts`);
      return;
    }
    const { name, number } = this.state;
    this.props.addContact({ name, number });
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Label htmlFor="InputName">Name</Label>
        <InputName
          onChange={this.handleChange}
          value={this.state.name}
          type="text"
          name="name"
          id="InputName"
          pattern="^[a-zA-Zа-яА-Я-і]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <Label htmlFor="InputNumber">Number</Label>
        <InputName
          onChange={this.handleChange}
          value={this.state.number}
          id="InputNumber"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <Btn type="submit">add contact</Btn>
      </Form>
    );
  }
}

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  addContact: PropTypes.func.isRequired,
};
