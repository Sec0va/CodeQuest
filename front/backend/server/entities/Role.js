import { EntitySchema } from 'typeorm';

export class Role {}

export const RoleSchema = new EntitySchema({
  name: 'Role',
  target: Role,
  tableName: 'roles',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment'
    },
    name: {
      type: String,
      unique: true
    }
  }
});
