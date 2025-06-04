import { SQLiteDatabase } from "react-native-sqlite-storage";
import { Note } from "../types";

export const insertNote = async (
    db: SQLiteDatabase, 
    {title, description, opening_date, expiration_date}: Omit<Note, 'id'>
): Promise<Note> => {
    const query = `Insert into notes (title, description, opening_date, expiration_date) values (?,?,?,?);`;
    const [res] = await db.executeSql(query, [title, description, opening_date, expiration_date]);
    if (res.rowsAffected = 0) throw Error("Note could not be inserted.");
    return res.rows.raw()[0];
}