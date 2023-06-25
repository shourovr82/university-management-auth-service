import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { facultyFilterableFields } from './faculty.constants';
import { IFaculty } from './faculty.interfaces';
import { FacultyService } from './faculty.service';

// controller
const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  //
  const result = await FacultyService.getAllFaculties(
    filters,
    paginationOptions
  );

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

// single Faculty
const getSingleAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    //
    const result = await FacultyService.getSingleFaculty(id);
    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty retrieved successfully !',
      data: result,
    });
    next();
  }
);

// update Faculty
const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req?.body;

  //

  //
  const result = await FacultyService.updateFaculty(id, updatedData);
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully !',
    data: result,
  });
});

// delete Faculty
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FacultyService.deleteFaculty(id);
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully !',
    data: result,
  });
});

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
