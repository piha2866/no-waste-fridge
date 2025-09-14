interface BaseNote {
  title: string;
  description: string;
  openingDate: Date;
  expirationDate: Date;
  imageLocation?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NewNote extends BaseNote {}

export interface Note extends BaseNote {
  id: number;
}
