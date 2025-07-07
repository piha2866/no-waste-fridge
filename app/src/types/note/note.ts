interface BaseNote {
  title: string;
  description: string;
  openingDate: string;
  expirationDate: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NewNote extends BaseNote {}

export interface Note extends BaseNote {
  id: number;
}
