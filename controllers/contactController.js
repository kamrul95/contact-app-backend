const asyncHandler = require("express-async-handler");
const Contact = require("../model/contactModel");

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
  console.log("Body:", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error({ message: "All fields are required" });
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id
  });
  res.status(201).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error(`Contact not found`);
  }
  if(contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('User are not allowed to update other users contacts')
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async(req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error(`Contact not found`);
  }
  if(contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('User are not allowed to delete other users contacts')
  }
  await Contact.findByIdAndDelete(req.params.id)
  res.status(200).json(contact);
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.find({_id: req.params.id, user_id: req.user.id});
  if (!contact) {
    res.status(404);
    throw new Error(contact);
  }
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  getContact,
};
