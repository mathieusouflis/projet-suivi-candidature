import { Contact } from "@/types/contact";
import { callApiWithAuth } from "./apiService";

export const getContacts = async () => {
  return await callApiWithAuth("/contacts", "GET");
};

export const getContactById = async (id: number) => {
  return await callApiWithAuth(`/contacts/${id}`, "GET");
};

export const createContact = async (contact: Contact) => {
  return await callApiWithAuth("/contacts", "POST", contact);
};

export const updateContact = async (contact: Contact) => {
  return await callApiWithAuth(`/contacts/${contact.id}`, "PUT", contact);
};

export const deleteContact = async (id: number) => {
  return await callApiWithAuth(`/contacts/${id}`, "DELETE");
};
