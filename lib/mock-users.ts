import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

const DEMO_USER: MockUser = {
  id: "1",
  name: "Demo User",
  email: "demo@xorithm.com",
  passwordHash: bcrypt.hashSync("demo1234", 10),
};

function isRedisConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function getRedis() {
  const { Redis } = await import("@upstash/redis");
  return new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
}

const DB_PATH = path.join(process.cwd(), "lib/users.json");

function readUsersFromFile(): MockUser[] {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify([DEMO_USER], null, 2));
      return [DEMO_USER];
    }
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  } catch {
    return [DEMO_USER];
  }
}

function writeUsersToFile(users: MockUser[]) {
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
}

export async function findUserByEmail(
  email: string,
): Promise<MockUser | undefined> {
  const normalised = email.toLowerCase();

  if (isRedisConfigured()) {
    if (normalised === DEMO_USER.email) return DEMO_USER;
    const redis = await getRedis();
    const user = await redis.get<MockUser>(`user:${normalised}`);
    return user ?? undefined;
  }

  return readUsersFromFile().find((u) => u.email.toLowerCase() === normalised);
}

export async function createUser(
  name: string,
  email: string,
  password: string,
): Promise<MockUser> {
  const normalised = email.toLowerCase();
  const existing = await findUserByEmail(normalised);
  if (existing) throw new Error("Email already in use");

  const newUser: MockUser = {
    id: crypto.randomUUID(),
    name,
    email: normalised,
    passwordHash: bcrypt.hashSync(password, 10),
  };

  if (isRedisConfigured()) {
    const redis = await getRedis();
    await redis.set(`user:${normalised}`, newUser);
  } else {
    const users = readUsersFromFile();
    users.push(newUser);
    writeUsersToFile(users);
  }

  return newUser;
}
