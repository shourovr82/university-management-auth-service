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

// await createUserZodSchema.parseAsync(req);

export const AuthValidation = {
  loginZodSchema,
};
