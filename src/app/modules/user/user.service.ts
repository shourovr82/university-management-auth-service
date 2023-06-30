import { IUser } from './user.interface';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { IStudent } from '../student/student.interfaces';
import { AcademicSemester } from '../academicSemester/academicSemesterModel';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { User } from './user.model';
import { IFaculty } from '../faculty/faculty.interfaces';
import { Faculty } from '../faculty/faculty.model';
import { IAdmin } from '../admin/admin.interfaces';
import { ENUM_USER_ROLE } from '../../../enums/users';
import { Admin } from '../admin/admin.model';
import bcrypt from 'bcrypt';

//  create student
const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  //
  // set role
  user.role = ENUM_USER_ROLE.STUDENT;
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate student id
    const id = await generateStudentId(academicSemester);
    user.id = id;

    student.id = id;
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    // set student _id into user  --> user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    //
    newUserAllData = newUser[0];
    //
    await session.commitTransaction();
    await session.endSession();
    // user  ---> student ---> academicSemester , academicDepartment, academicFaculty
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  //
  return newUserAllData;
};

// create faculty
const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }
  // set role
  user.role = ENUM_USER_ROLE.FACULTY;

  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // generate student id
    const id = await generateFacultyId();
    user.id = id;

    faculty.id = id;
    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    // set faculty _id into user  --> user.student
    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    //
    newUserAllData = newUser[0];
    //
    await session.commitTransaction();
    await session.endSession();
    // user  ---> student ---> academicSemester , academicDepartment, academicFaculty
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  //
  return newUserAllData;
};

// create admin
const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }
  // set role
  user.role = ENUM_USER_ROLE.ADMIN;

  let newUserAllData = null;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // generate student id
    const id = await generateAdminId();
    user.id = id;

    admin.id = id;
    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
    }

    // set admin _id into user  --> user.admin
    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // if (newUser.length) {
    //   console.log(newUser);
    //   console.log(user);
    //   throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    // }
    //
    newUserAllData = newUser[0];
    //
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }
  //
  return newUserAllData;
};

// export
export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
