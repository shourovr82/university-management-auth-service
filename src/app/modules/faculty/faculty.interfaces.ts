import { Model, Types } from 'mongoose';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interfaces';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interfaces';

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type IFaculty = {
  id: string;
  name: UserName; // embedded object
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender: 'male' | 'female';
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: ['A+', 'A-', 'B+', 'AB+', 'AB-', 'O+', 'O-'];
  designation: string;
  academicDepartment: Types.ObjectId | IAcademicDepartment; // reference id
  academicFaculty: Types.ObjectId | IAcademicFaculty; // reference id
  profileImage?: string;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;

export type IFacultyFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
