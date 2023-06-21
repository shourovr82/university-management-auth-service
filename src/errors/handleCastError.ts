import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import httpStatus from 'http-status';

const handleCastError = (error: mongoose.Error.CastError) => {
  //
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ];

  return {
    statusCode: httpStatus.NOT_FOUND,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleCastError;
