import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interfaces';

// get single document -------------------- >
const loginUser = async (payload: ILoginUser) => {
  //
  const { id, password } = payload;
  // creating instance of  user exist or not
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist !!');
  }

  // match password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect !!');
  }

  // create access token

  return {};
};

export const AuthService = {
  loginUser,
};
