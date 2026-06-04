import bcrypt from "bcryptjs";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

const users: MockUser[] = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@xorithm.com",
    passwordHash: bcrypt.hashSync("demo1234", 10),
  },
];

export function findUserByEmail(email: string): MockUser | undefined {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function createUser(name: string, email: string, password: string): MockUser {
  if (findUserByEmail(email)) {
    throw new Error("Email already in use");
  }
  const newUser: MockUser = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
  };
  users.push(newUser);
  return newUser;
}