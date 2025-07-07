import { NewNote, Note } from '../types/note/note';

export function isNote(note: Note | NewNote): note is Note {
  return 'id' in note;
}
