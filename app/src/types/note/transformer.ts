import { DBNewNote, DBNote } from '../../backend/db/types';
import { NewNote, Note } from './note';

export function noteFromDB({
  id,
  title,
  description,
  opening_date,
  expiration_date,
}: DBNote): Note {
  return {
    id,
    title,
    description,
    openingDate: opening_date,
    expirationDate: expiration_date,
  };
}

export function newNoteFromDB({
  title,
  description,
  opening_date,
  expiration_date,
}: DBNewNote): NewNote {
  return {
    title,
    description,
    openingDate: opening_date,
    expirationDate: expiration_date,
  };
}

export function noteToDB({ id, title, description, openingDate, expirationDate }: Note): DBNote {
  return {
    id,
    title,
    description,
    opening_date: openingDate,
    expiration_date: expirationDate,
  };
}

export function newNoteToDB({
  title,
  description,
  openingDate,
  expirationDate,
}: NewNote): DBNewNote {
  return {
    title,
    description,
    opening_date: openingDate,
    expiration_date: expirationDate,
  };
}
