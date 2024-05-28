import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, optional: true },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
  },
  { timestamps: true, versionKey: false },
);

// const newContactSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     email: { type: String, optional: true, default: '' },
//     isFavourite: { type: Boolean, default: false },
//     contactType: {
//       type: String,
//       enum: ['work', 'home', 'personal'],
//       optional: true,
//       default: 'personal',
//     },
//   },
//   { timestamps: true, versionKey: false },
// );

// const updateContactSchema = new Schema(
//   {
//     name: { type: String, optional: true },
//     phoneNumber: { type: String, optional: true },
//     email: { type: String, optional: true, default: '' },
//     isFavourite: { type: Boolean, optional: true, default: false },
//     contactType: {
//       type: String,
//       enum: ['work', 'home', 'personal'],
//       optional: true,
//       default: 'personal',
//     },
//   },
//   { timestamps: true, versionKey: false },
// );

export const ContactsCollection = model('contacts', contactSchema);
// export const NewContact = model('new', newContactSchema);
// export const UpdateContact = model('update', updateContactSchema);
