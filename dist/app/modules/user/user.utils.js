'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateAdminId =
  exports.findLastAdminId =
  exports.generateFacultyId =
  exports.findLastFacultyId =
  exports.generateStudentId =
  exports.findLastStudentId =
  exports.getLogDateAndTime =
    void 0;
/* eslint-disable no-undefined */
const users_1 = require('../../../enums/users');
const user_model_1 = require('./user.model');
const getLogDateAndTime = dateString => {
  const originalFormat = dateString;
  const modifiedFormat = originalFormat.replace('T', ' ').replace('Z', '');
  const dateTimeObj = new Date(modifiedFormat);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const formattedDateTime = dateTimeObj.toLocaleString('en-US', options);
  return formattedDateTime;
};
exports.getLogDateAndTime = getLogDateAndTime;
//  student id
const findLastStudentId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.User.findOne(
      { role: users_1.ENUM_USER_ROLE.STUDENT },
      { id: 1, _id: 0 }
    )
      .sort({
        createdAt: -1,
      })
      .lean();
    return (
      lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id
    )
      ? lastStudent === null || lastStudent === void 0
        ? void 0
        : lastStudent.id.substring(4)
      : undefined;
  });
exports.findLastStudentId = findLastStudentId;
const generateStudentId = academicSemester =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastStudentId)()) ||
      (0).toString().padStart(5, '0');
    // increment by 1
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `${
      academicSemester === null || academicSemester === void 0
        ? void 0
        : academicSemester.year.substring(2)
    }${
      academicSemester === null || academicSemester === void 0
        ? void 0
        : academicSemester.code
    }${incrementedId}`;
    console.log(incrementedId);
    return incrementedId;
  });
exports.generateStudentId = generateStudentId;
// generate faculty id
const findLastFacultyId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield user_model_1.User.findOne(
      { role: users_1.ENUM_USER_ROLE.FACULTY },
      { id: 1, _id: 0 }
    )
      .sort({
        createdAt: -1,
      })
      .lean();
    return (
      lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id
    )
      ? lastFaculty === null || lastFaculty === void 0
        ? void 0
        : lastFaculty.id.substring(2)
      : undefined;
  });
exports.findLastFacultyId = findLastFacultyId;
const generateFacultyId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastFacultyId)()) ||
      (0).toString().padStart(5, '0');
    // increment
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `F-${incrementedId}`;
    return incrementedId;
  });
exports.generateFacultyId = generateFacultyId;
// generate admin id
// find last admin id
const findLastAdminId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastAdminId = yield user_model_1.User.findOne(
      { role: users_1.ENUM_USER_ROLE.ADMIN },
      { id: 1, _id: 0 }
    )
      .sort({
        createdAt: -1,
      })
      .lean();
    return (
      lastAdminId === null || lastAdminId === void 0 ? void 0 : lastAdminId.id
    )
      ? lastAdminId === null || lastAdminId === void 0
        ? void 0
        : lastAdminId.id.substring(2)
      : undefined;
  });
exports.findLastAdminId = findLastAdminId;
// generate
const generateAdminId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastAdminId)()) || (0).toString().padStart(5, '0');
    // increment
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `A-${incrementedId}`;
    return incrementedId;
  });
exports.generateAdminId = generateAdminId;
