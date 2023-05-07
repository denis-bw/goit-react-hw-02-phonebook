import React, { Component } from "react";
import { nanoid } from "nanoid";
import { ContactForm } from '../ContactForm/ContactForm'
import {ListContacts} from '../ContactList/ContactList'
import { Filter } from '../Filter/Filter'
import css from './App.module.css'


export class App extends Component  {
  state = {
    contacts: [],
    filter: '',
  } 

  handleSubmit = (e) => {
    e.preventDefault();
    const {name, number} = e.currentTarget;

    this.state.contacts.find(contact => {
      return name.value === contact.name ? alert( `${contact.name} is already in contacts`) : true
    }) 

    const contact = { id: nanoid(), name: name.value, number: number.value };

    this.setState((state) => {
      return { contacts: [...state.contacts, contact] };
    })

    name.value = "";
    number.value = "";
    this.resetState();
  }

  filterList = e => {
    this.setState({ filter: e.currentTarget.value })
  }

  deleteContact = e => {
    e.preventDefault();
    const positiveValues = this.state.contacts.filter(el => el.id !== e.currentTarget.id);
    this.setState({ contacts: positiveValues })
  }

  resetState = () => {
    this.setState({
      name: '',
      number: ''
    })
  }

  render() {

    const normalizedFilter = this.state.filter.toUpperCase();
    const visibleContact = this.state.contacts.filter(constact => constact.name.toUpperCase().includes(normalizedFilter))
  
    return (  
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>

        <ContactForm handleSubmitForm={this.handleSubmit} />
        
        <h2 className={css.title}>Contacts</h2>

        <Filter filterList={this.filterList} />
        <ListContacts visibleContact={visibleContact} deleteContact={this.deleteContact} />
      </div>
    )}

};
