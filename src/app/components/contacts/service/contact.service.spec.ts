import { TestBed } from '@angular/core/testing';
import { ContactsService } from './contacts.service';
import { ContactModel } from '../models/contact-model';

describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial sample data and sort it', () => {
    const sortedContacts = service.sortedContacts();
    expect(sortedContacts.length).toBe(3);
    expect(sortedContacts[0].firstName).toBe('Jane'); // Smith, Jane
    expect(sortedContacts[1].firstName).toBe('John'); // Doe, John
    expect(sortedContacts[2].firstName).toBe('Mike'); // Johnson, Mike
  });

  it('should add a new contact and keep the list sorted', () => {
    const newContactData: Omit<ContactModel, 'id' | 'createdAt' | 'updatedAt'> = {
      firstName: 'Alan',
      lastName: 'Turing',
      email: 'alan.turing@bletchleypark.com',
      phone: '123-456-7890',
      mobile: false,
      company: 'Bletchley Park',
      notes: 'Codebreaker'
    };

    service.addContact(newContactData);
    const sortedContacts = service.sortedContacts();

    expect(sortedContacts.length).toBe(4);
    expect(sortedContacts[0].firstName).toBe('Alan'); // Turing, Alan
  });

  it('should update an existing contact', () => {
    const contacts = service.sortedContacts();
    const contactToUpdate = contacts[1]; // John Doe
    const updates = {
      firstName: 'Jonathan',
      company: 'Innovate LLC'
    };

    service.updateContact(contactToUpdate.id, updates);

    const updatedContact = service.getContactById(contactToUpdate.id);
    expect(updatedContact?.firstName).toBe('Jonathan');
    expect(updatedContact?.company).toBe('Innovate LLC');
    expect(updatedContact?.updatedAt).not.toEqual(contactToUpdate.updatedAt);
  });
  
  it('should re-sort contacts when a name is updated', () => {
    const contactToUpdate = service.sortedContacts().find(c => c.firstName === 'Mike'); // Mike Johnson
    expect(contactToUpdate).toBeDefined();

    service.updateContact(contactToUpdate!.id, { firstName: 'Aaron' });
    
    const sortedContacts = service.sortedContacts();
    expect(sortedContacts[0].firstName).toBe('Aaron');
  });

  it('should delete a contact', () => {
    const contactToDelete = service.sortedContacts()[1]; // John Doe
    service.deleteContact(contactToDelete.id);

    const sortedContacts = service.sortedContacts();
    expect(sortedContacts.length).toBe(2);
    expect(service.getContactById(contactToDelete.id)).toBeUndefined();
  });

  it('should get a contact by its ID', () => {
    // This ID is from the initial sample data
    const existingId = '1';
    const contact = service.getContactById(existingId);
    expect(contact).toBeDefined();
    expect(contact?.id).toBe(existingId);
    expect(contact?.firstName).toBe('John');
  });

  it('should return undefined for a non-existent contact ID', () => {
    const nonExistentId = 'non-existent-id';
    const contact = service.getContactById(nonExistentId);
    expect(contact).toBeUndefined();
  });
});
