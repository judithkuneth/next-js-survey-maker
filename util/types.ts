export type User = {
  id: number;
  username: string;
  createdAt: Date;
  passwordHash: string;
};

export type SerializedUser = {
  id: number;
  username: string;
  createdAt: string;
  passwordHash: string;
};

export type Session = {
  id: number;
  userId: number;
  token: string;
  expiryTimestamp: string;
};
