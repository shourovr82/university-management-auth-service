import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interfaces';
import { IFaculty } from '../faculty/faculty.interfaces';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  // admin?: Types.ObjectId | IAdmin;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
