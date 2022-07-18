import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import { db } from '../connection/db';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare readonly id: CreationOptional<number>;
  declare tgId: number;
  declare right: number;
  declare notRight: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    tgId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    right: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    notRight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'users',
    sequelize: db,
  }
);

export { User };
