import { User } from '../models/userModel';

let users: User[] = [
  {
    id: 1,
    email: 'admin@123.com',
    username: 'admin',
    password: '123',
    role: 'admin',
  },
  {
    id: 2,
    email: 'hola@123.com',
    username: 'hola',
    password: '123',
    role: 'user',
  },
];

export function registerUser(email: string, username: string, password: string, role: 'admin' | 'user' = 'user'): User {
  const newUser: User = {
    id: users.length + 1,
    email,
    username,
    password,
    role,
  };
  users.push(newUser);
  return newUser;
}

export function loginUser(email: string, password: string): User | null {
  const user = users.find((u) => u.email === email && u.password === password);
  return user || null;
}

export function recoverPassword(email: string): boolean {
  const user = users.find((u) => u.email === email);
  // Simulando el envío de un correo de recuperación de contraseña
  if (user) {
    console.log(`Enviando correo de recuperación a ${email}`);
    return true;
  }
  return false;
}

export function getUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}