import { LucideIcon } from 'lucide-react';

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  lastLogin: Date;
  role: 'admin' | 'user';
  authProviderId: string;
}

export interface MockAPI {
  id: string;
  path: string;
  schema: string;
  schemaType: 'json' | 'mongoose';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Route {
  label: string;
  icon: LucideIcon;
  href: string;
  active: boolean;
}
