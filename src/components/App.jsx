import { nanoid } from "nanoid";
import React, { Component } from "react";
import { Title } from "./Title/Title";
import { Form } from "./Form/Form";
import { Contacts } from "./Contacts/Contacts";
import { Filter } from "./Filter/Filter";

import css from './App.module.css'

const storageContactsKey = "Contacts";

export class App extends Component{
  state = {
    contacts: [
          {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
          {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
          {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
          {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    name: '',
    number: '',
    filter:'',
  }

   componentDidMount() {
     const localStorageContacts = localStorage.getItem(storageContactsKey);
      if (localStorageContacts!== null) {
        this.setState({contacts: JSON.parse(localStorageContacts)})
     }
  }

  componentDidUpdate(prevProps, prevState){
    const { contacts: prevContacts } = prevState;
    const { contacts: newContacts } = this.state;

    if (prevContacts!== newContacts) {
        localStorage.setItem(storageContactsKey, JSON.stringify(this.state.contacts));
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    const isSuchName = this.state.contacts.some(item => (item.name.toLowerCase() === e.target.name.value.toLowerCase()));
    if ( isSuchName){
      return alert(`${e.target.name.value} is already in contacts`)
    }
    
    const contact = {
      id: nanoid(),
      name: e.target.name.value,
      number: e.target.number.value,
    }
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, contact]
    }))
    this.setState({name: '', number:''})
  }

  handleFilter = e => {
    this.setState({ filter: e.target.value })

  }


  getVisibleFilteredItems = () => {
    const { contacts, filter } = this.state;
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    return contacts.filter(contact => (contact.name.toLowerCase().includes(filter.toLowerCase())));

    
  }

  handleDeleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact=>contact.id!==id)
    }))
  }


  render() {
      return (
    <div className={css.wrapper}>
          <Title title='Phonebook' />
          <Form changedValue={this.handleChange} submit={this.handleSubmit} value={ this.state} />
          <Title title='Contacts' />
          <Filter filter={ this.handleFilter} />
          <Contacts contacts={this.getVisibleFilteredItems()} forDelete={this.handleDeleteContact} />
    </div>
  );
  }
};
