import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

// routes -=---->
router.get('/', AdminController.getAllAdmins);

router.get('/:id', AdminController.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdmin
);

export const AdminRoutes = router;
