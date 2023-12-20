import { ContactListItem } from './ContactListItem';

export const ContactList = ({ filteredContacts, handleDeleteContact }) => {
  return (
    <ul>
      {filteredContacts.map(({ id, name, phone }) => (
        <ContactListItem
          key={id}
          id={id}
          name={name}
          number={phone}
          handleDeleteContact={handleDeleteContact}
        />
      ))}
    </ul>
  );
};
