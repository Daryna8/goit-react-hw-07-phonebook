import React, { useEffect } from 'react';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import s from './PhoneBook.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/phonebook/phonebookSlice';
import {
  addContactThunk,
  deleteContactsThunk,
  fetchContactsThunk,
} from '../redux/phonebook/operations';

export const App = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.phonebookData.contacts.items);
  const filter = useSelector(state => state.phonebookData.filter);
  const loading = useSelector(state => state.phonebookData.contacts.isLoading);
  const error = useSelector(state => state.phonebookData.contacts.error);

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  const handleChangeFilter = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleAddContact = newContact => {
    if (contacts.map(c => c.name).includes(newContact.name)) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    dispatch(addContactThunk(newContact));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContactsThunk(id));
  };

  return (
    <div className={s.phonebook}>
      {loading && !error && <b>Request in progress...</b>}
      <h1>Phonebook</h1>
      <ContactForm handleAddContact={handleAddContact} />

      <div className={s.contacts}>
        <h2>Contacts</h2>
        <Filter filter={filter} handleChangeInput={handleChangeFilter} />
        <ContactList
          filteredContacts={filteredContacts}
          handleDeleteContact={handleDeleteContact}
        />
      </div>
    </div>
  );
};
