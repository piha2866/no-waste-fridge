import { SQLiteDatabase } from "react-native-sqlite-storage";
import { Note } from "../types";

export const updateNote = async (
    db:SQLiteDatabase, 
    note: Note
): Promise<Note> => {
    const query = `Update notes set title = ${note.title}, description = ${note.description}, opening_date = ${note.opening_date}, expiration_date = ${note.expiration_date} where id = ${note.id};`
    const [res] = await db.executeSql(query);
    if (res.rowsAffected = 0) throw Error("Note could not be updated.");
    return res.rows.raw()[0];
}