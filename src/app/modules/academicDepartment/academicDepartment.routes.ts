import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';
const router = express.Router();

// routes
router.post(
  '/create-department',
  validateRequest(AcademicDepartmentValidation.createDepartmentZodSchema),
  AcademicDepartmentController.createDepartment
);
router.get('/:id', AcademicDepartmentController.getSingleDepartment);

router.patch(
  '/:id',
  validateRequest(AcademicDepartmentValidation.updateDepartmentZodSchema),
  AcademicDepartmentController.updateDepartment
);
router.delete('/:id', AcademicDepartmentController.deleteDepartment);
router.get('/', AcademicDepartmentController.getAllDepartments);
//
export const AcademicDepartmentRoutes = router;
