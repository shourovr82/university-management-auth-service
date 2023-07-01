import { z } from 'zod';

//  update admin
const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'Id is Required',
    }),
    password: z.string({
      required_error: 'Password is Required',
    }),
  }),
});
// refresh token
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is Required',
    }),
  }),
});

// await createUserZodSchema.parseAsync(req);

export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
};
