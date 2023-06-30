/* eslint-disable no-undefined */
import { ENUM_USER_ROLE } from '../../../enums/users';
import { IAcademicSemester } from '../academicSemester/academicSemester.Interface';
import { User } from './user.model';

export const getLogDateAndTime = (dateString: string): string => {
  const originalFormat: string = dateString;
  const modifiedFormat: string = originalFormat
    .replace('T', ' ')
    .replace('Z', '');
  const dateTimeObj: Date = new Date(modifiedFormat);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  const formattedDateTime: string = dateTimeObj.toLocaleString(
    'en-US',
    options
  );
  return formattedDateTime;
};

//  student id
export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    { role: ENUM_USER_ROLE.STUDENT },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent?.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  // increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementedId}`;
  return incrementedId;
};

// generate faculty id
export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne(
    { role: ENUM_USER_ROLE.FACULTY },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty?.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');

  // increment
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `F-${incrementedId}`;

  return incrementedId;
};

// generate admin id

// find last admin id
export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdminId = await User.findOne(
    { role: ENUM_USER_ROLE.ADMIN },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdminId?.id ? lastAdminId?.id.substring(2) : undefined;
};
// generate
export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');

  // increment
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};
