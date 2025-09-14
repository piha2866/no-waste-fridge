import { DBNewNote, DBNote } from '../../backend/db/types';
import { NewNote, Note } from './note';

export function noteFromDB({
  id,
  title,
  description,
  opening_date,
  expiration_date,
  image_location,
}: DBNote): Note {
  return {
    id,
    title,
    description,
    openingDate: new Date(opening_date),
    expirationDate: new Date(expiration_date),
    imageLocation: image_location,
  };
}

export function newNoteFromDB({
  title,
  description,
  opening_date,
  expiration_date,
  image_location,
}: DBNewNote): NewNote {
  return {
    title,
    description,
    openingDate: new Date(opening_date),
    expirationDate: new Date(expiration_date),
    imageLocation: image_location,
  };
}

export function noteToDB({
  id,
  title,
  description,
  openingDate,
  expirationDate,
  imageLocation,
}: Note): DBNote {
  return {
    id,
    title,
    description,
    opening_date: String(openingDate),
    expiration_date: String(expirationDate),
    image_location: imageLocation,
  };
}

export function newNoteToDB({
  title,
  description,
  openingDate,
  expirationDate,
  imageLocation,
}: NewNote): DBNewNote {
  return {
    title,
    description,
    opening_date: String(openingDate),
    expiration_date: String(expirationDate),
    image_location: imageLocation,
  };
}
