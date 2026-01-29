import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import { dataSource } from './data-source.js';
import { UserSchema } from './entities/User.js';
import { RoleSchema } from './entities/Role.js';
import { UserRoleSchema } from './entities/UserRole.js';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const ADMIN_KEY = process.env.ADMIN_KEY ?? 'dev-admin-key';

let userRepo;
let roleRepo;
let userRoleRepo;

function makeHandle(username) {
  const base = username.trim().toLowerCase().replace(/\s+/g, '_');
  return `@${base}`;
}

function normalize(input) {
  return typeof input === 'string' ? input.trim() : '';
}

async function ensureDefaultRoles() {
  const roles = ['admin', 'organizer', 'user'];
  await roleRepo
    .createQueryBuilder()
    .insert()
    .values(roles.map((name) => ({ name })))
    .orIgnore()
    .execute();
}

async function findUserByIdentifier(identifier) {
  return userRepo
    .createQueryBuilder('user')
    .where('LOWER(user.email) = LOWER(:identifier)', { identifier })
    .orWhere('LOWER(user.username) = LOWER(:identifier)', { identifier })
    .getOne();
}

async function findConflict(email, username, handle) {
  return userRepo
    .createQueryBuilder('user')
    .select(['user.id', 'user.email', 'user.username', 'user.handle'])
    .where('LOWER(user.email) = LOWER(:email)', { email })
    .orWhere('LOWER(user.username) = LOWER(:username)', { username })
    .orWhere('LOWER(user.handle) = LOWER(:handle)', { handle })
    .getOne();
}

async function getUserRoles(userId) {
  const rows = await roleRepo
    .createQueryBuilder('role')
    .select('role.name', 'name')
    .innerJoin('user_roles', 'ur', 'ur.role_id = role.id')
    .where('ur.user_id = :userId', { userId })
    .getRawMany();

  return rows.map((row) => row.name);
}

async function buildUserResponse(userRow) {
  const roles = await getUserRoles(userRow.id);
  return {
    id: userRow.id,
    email: userRow.email,
    username: userRow.username,
    handle: userRow.handle,
    location: userRow.location,
    avatar: userRow.avatarUrl ?? null,
    roles
  };
}

async function assignRoleToUser(userId, roleName) {
  const roleRow = await roleRepo
    .createQueryBuilder('role')
    .where('LOWER(role.name) = LOWER(:roleName)', { roleName })
    .getOne();

  if (!roleRow) {
    return null;
  }

  await userRoleRepo
    .createQueryBuilder()
    .insert()
    .values({ userId, roleId: roleRow.id })
    .orIgnore()
    .execute();

  return roleRow;
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/register', async (req, res) => {
  try {
    const email = normalize(req.body.email);
    const username = normalize(req.body.username);
    const password = normalize(req.body.password);
    const location = typeof req.body.location === 'string' ? req.body.location : null;
    const avatar = typeof req.body.avatar === 'string' ? req.body.avatar : null;

    if (!email || !username || !password) {
      return res.status(400).json({ message: 'Email, username and password are required.' });
    }

    const handle = makeHandle(username);
    const conflict = await findConflict(email, username, handle);
    if (conflict) {
      if (conflict.email?.toLowerCase() === email.toLowerCase()) {
        return res.status(409).json({ message: 'Email already in use.' });
      }
      if (conflict.username?.toLowerCase() === username.toLowerCase()) {
        return res.status(409).json({ message: 'Username already in use.' });
      }
      return res.status(409).json({ message: 'Handle already in use.' });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const userRow = await userRepo.save({
      id: crypto.randomUUID(),
      email,
      username,
      handle,
      passwordHash,
      location,
      avatarUrl: avatar,
      status: 'active'
    });

    await assignRoleToUser(userRow.id, 'user');

    const user = await userRepo.findOneBy({ id: userRow.id });
    if (!user) {
      return res.status(500).json({ message: 'User creation failed.' });
    }

    return res.status(201).json({ user: await buildUserResponse(user) });
  } catch (error) {
    console.error('Register failed', error);
    return res.status(500).json({ message: 'Server error.' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const identifier = normalize(req.body.identifier);
    const password = normalize(req.body.password);

    if (!identifier || !password) {
      return res.status(400).json({ message: 'Identifier and password are required.' });
    }

    const userRow = await findUserByIdentifier(identifier);
    if (!userRow) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    if (userRow.status !== 'active') {
      return res.status(403).json({ message: 'Account is not active.' });
    }

    const isValid = bcrypt.compareSync(password, userRow.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    await userRepo.update({ id: userRow.id }, { lastLoginAt: new Date() });
    const updated = await userRepo.findOneBy({ id: userRow.id });
    if (!updated) {
      return res.status(500).json({ message: 'Login failed.' });
    }

    return res.json({ user: await buildUserResponse(updated) });
  } catch (error) {
    console.error('Login failed', error);
    return res.status(500).json({ message: 'Server error.' });
  }
});

app.post('/api/admin/assign-role', async (req, res) => {
  try {
    const adminKey = normalize(req.body.adminKey);
    const identifier = normalize(req.body.identifier);
    const role = normalize(req.body.role);

    if (!adminKey || adminKey !== ADMIN_KEY) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    if (!identifier || !role) {
      return res.status(400).json({ message: 'Identifier and role are required.' });
    }

    const roleRow = await roleRepo
      .createQueryBuilder('role')
      .where('LOWER(role.name) = LOWER(:role)', { role })
      .getOne();

    if (!roleRow) {
      return res.status(400).json({ message: 'Unknown role.' });
    }

    const userRow = await findUserByIdentifier(identifier);
    if (!userRow) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await assignRoleToUser(userRow.id, roleRow.name);
    const updated = await userRepo.findOneBy({ id: userRow.id });
    if (!updated) {
      return res.status(500).json({ message: 'Role assignment failed.' });
    }

    return res.json({ user: await buildUserResponse(updated) });
  } catch (error) {
    console.error('Assign role failed', error);
    return res.status(500).json({ message: 'Server error.' });
  }
});

async function startServer() {
  try {
    await dataSource.initialize();
    userRepo = dataSource.getRepository(UserSchema);
    roleRepo = dataSource.getRepository(RoleSchema);
    userRoleRepo = dataSource.getRepository(UserRoleSchema);

    await ensureDefaultRoles();

    const port = process.env.PORT ? Number(process.env.PORT) : 3001;
    app.listen(port, () => {
      console.log(`API server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start API server', error);
    process.exit(1);
  }
}

startServer();
