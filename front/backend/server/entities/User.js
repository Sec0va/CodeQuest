import { EntitySchema } from 'typeorm';

export class User {}

export const UserSchema = new EntitySchema({
  name: 'User',
  target: User,
  tableName: 'users',
  columns: {
    id: {
      type: String,
      primary: true
    },
    email: {
      type: String,
      unique: true
    },
    username: {
      type: String,
      unique: true
    },
    handle: {
      type: String,
      unique: true
    },
    passwordHash: {
      type: String,
      name: 'password_hash'
    },
    location: {
      type: String,
      nullable: true
    },
    avatarUrl: {
      type: String,
      name: 'avatar_url',
      nullable: true
    },
    status: {
      type: String,
      default: 'active'
    },
    createdAt: {
      type: Date,
      name: 'created_at',
      createDate: true
    },
    updatedAt: {
      type: Date,
      name: 'updated_at',
      updateDate: true
    },
    lastLoginAt: {
      type: Date,
      name: 'last_login_at',
      nullable: true
    }
  }
});
