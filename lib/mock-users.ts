import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

const DB_PATH = path.join(process.cwd(), "lib/users.json");

function getDefaultUsers(): MockUser[] {
  return [
    {
      id: "1",
      name: "Demo User",
      email: "demo@xorithm.com",
      passwordHash: bcrypt.hashSync("demo1234", 10),
    },
  ];
}

function readUsers(): MockUser[] {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const defaults = getDefaultUsers();
      writeUsers(defaults);
      return defaults;
    }
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return getDefaultUsers();
  }
}

function writeUsers(users: MockUser[]) {
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
}

export function findUserByEmail(email: string): MockUser | undefined {
  return readUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function createUser(
  name: string,
  email: string,
  password: string,
): MockUser {
  const users = readUsers();
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("Email already in use");
  }
  const newUser: MockUser = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
  };
  users.push(newUser);
  writeUsers(users);
  return newUser;
}
