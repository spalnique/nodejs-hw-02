import { KEYS_OF_CONTACT, SORT_ORDER } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = KEYS_OF_CONTACT._id,
  sortOrder = SORT_ORDER.ASC,
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find({ userId });

  if (filter.contactType)
    contactsQuery.where(KEYS_OF_CONTACT.contactType).equals(filter.contactType);

  if (typeof filter.isFavourite === 'boolean')
    contactsQuery.where(KEYS_OF_CONTACT.isFavourite).equals(filter.isFavourite);

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return { data: contacts, ...paginationData };
};

export const getContactById = (_id, userId) =>
  ContactsCollection.findOne({ _id, userId });

export const createContact = (payload) => ContactsCollection.create(payload);

export const deleteContact = (_id, userId) =>
  ContactsCollection.findOneAndDelete({ _id, userId });

export const updateContact = async (_id, userId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;
  return rawResult.value;
};
