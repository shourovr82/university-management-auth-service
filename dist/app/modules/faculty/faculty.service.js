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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.FacultyService = void 0;
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const http_status_1 = __importDefault(require('http-status'));
const faculty_model_1 = require('./faculty.model');
const faculty_constants_1 = require('./faculty.constants');
// get all Faculty service ------------------>
const getAllFaculties = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // search term ====>
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    // and conditions
    const andConditions = [];
    //
    if (searchTerm) {
      andConditions.push({
        $or: faculty_constants_1.facultySearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }
    //  filtering
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
    // ----->
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelper.calculatePagination(
        paginationOptions
      );
    const sortConditions = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield faculty_model_1.Faculty.find(whereConditions)
      .populate('academicDepartment')
      .populate('academicFaculty')
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const total = yield faculty_model_1.Faculty.countDocuments(whereConditions);
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
// get single document -------------------- >
const getSingleFaculty = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.findOne({ id })
      .populate('academicDepartment')
      .populate('academicFaculty');
    return result;
  });
// update Faculty
const updateFaculty = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    //
    const isExist = yield faculty_model_1.Faculty.findOne({ id });
    if (!isExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Faculty Not found'
      );
    }
    //
    const { name } = payload,
      FacultyData = __rest(payload, ['name']);
    //
    const updatedFacultyData = Object.assign({}, FacultyData);
    //dynamically handle
    if (name && Object.keys(name).length > 0) {
      Object.keys(name).forEach(key => {
        const nameKey = `name.${key}`;
        updatedFacultyData[nameKey] = name[key];
      });
    }
    const result = yield faculty_model_1.Faculty.findOneAndUpdate(
      { id },
      updatedFacultyData,
      {
        new: true,
      }
    );
    return result;
  });
// delete Faculty
const deleteFaculty = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.findByIdAndDelete(id)
      .populate('academicSemester')
      .populate('academicDepartment')
      .populate('academicFaculty');
    return result;
  });
// ------------------>
exports.FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
