interface BaseNote {
  title: string;
  description: string;
  opening_date: string;
  expiration_date: string;
  image_location?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DBNewNote extends BaseNote {}

export interface DBNote extends BaseNote {
  id: number;
}
