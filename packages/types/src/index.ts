export interface User {
  name: string;
  email: string;
  profilePicture: string;
  lastLogin: Date;
  role: 'admin' | 'user';
  authProviderId: string;
}
