import { EntitySchema } from 'typeorm';

export class UserRole {}

export const UserRoleSchema = new EntitySchema({
  name: 'UserRole',
  target: UserRole,
  tableName: 'user_roles',
  columns: {
    userId: {
      type: String,
      name: 'user_id',
      primary: true
    },
    roleId: {
      type: Number,
      name: 'role_id',
      primary: true
    },
    assignedAt: {
      type: Date,
      name: 'assigned_at',
      createDate: true
    }
  }
});
