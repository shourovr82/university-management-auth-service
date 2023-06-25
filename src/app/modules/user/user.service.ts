import { IUser } from './user.interface';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { generateFacultyId, generateStudentId } from './user.utils';
import { IStudent } from '../student/student.interfaces';
import { AcademicSemester } from '../academicSemester/academicSemesterModel';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { User } from './user.model';
import { IFaculty } from '../faculty/faculty.interfaces';
import { Faculty } from '../faculty/faculty.model';

//  create student
const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  // set role
  user.role = 'student';
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
    user.password = config.default_student_pass as string;
  }
  // set role
  user.role = 'faculty';

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

    // set student _id into user  --> user.student
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

// export
export const UserService = {
  createStudent,
  createFaculty,
};
