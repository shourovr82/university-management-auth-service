"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.AdminSchema = void 0;
const mongoose_1 = require("mongoose");
const admin_constants_1 = require("./admin.constants");
exports.AdminSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            middleName: {
                type: String,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
    },
    dateOfBirth: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    contactNo: {
        type: String,
        unique: true,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: admin_constants_1.adminGender,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: admin_constants_1.adminBloodGroup,
    },
    designation: {
        type: String,
        required: true,
    },
    managementDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'managementDepartment',
    },
    profileImage: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Admin = (0, mongoose_1.model)('Admin', exports.AdminSchema);
