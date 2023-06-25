import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from '../admin/admin.controller';
import { AdminValidation } from '../admin/admin.validation';
const router = express.Router();

// routes -=---->
// get student
router.get('/:id', AdminController.getSingleAdmin);
router.get('/', AdminController.getAllAdmins);
router.delete('/:id', AdminController.deleteAdmin);

router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdmin
);

export const StudentRoutes = router;
