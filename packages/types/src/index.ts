export interface User {
  name: string;
  email: string;
  profilePicture: string;
  lastLogin: Date;
  role: 'admin' | 'user';
  authProviderId: string;
}

export interface MockAPI {
  id: number;
  path: string;
  schema: string;
  schemaType: 'json' | 'mongoose';
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface APIKey {
  id: number;
  name: string;
  key: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}