import ApiError from '../../../errors/ApiError';
import { IAcademicSemester } from './academicSemester.Interface';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { AcademicSemester } from './academicSemesterModel';
import httpStatus from 'http-status';

const createSemester = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {
  //  summer 02 !== 03  ---> throw error
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);

  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
