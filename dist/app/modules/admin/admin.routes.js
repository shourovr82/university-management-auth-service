"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const router = express_1.default.Router();
// routes -=---->
router.get('/', admin_controller_1.AdminController.getAllAdmins);
router.get('/:id', admin_controller_1.AdminController.getSingleAdmin);
router.delete('/:id', admin_controller_1.AdminController.deleteAdmin);
router.patch('/:id', (0, validateRequest_1.default)(admin_validation_1.AdminValidation.updateAdminZodSchema), admin_controller_1.AdminController.updateAdmin);
exports.AdminRoutes = router;
