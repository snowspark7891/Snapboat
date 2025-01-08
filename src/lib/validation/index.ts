//to make the component more re usablwe
//validation for each form 
import {z} from 'zod'

export const signUpValidation = z.object({
  //all validations for signup form
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(20, { message: "too long !" }),
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "too long !" }),
  email: z.string().email(),
  password: z
    .string()
    .min(5, { message: "password must be of 5 charecters ! " })
    .max(40),
});

export const signInValidation = z.object({
  //all validations for signIn form
  email: z.string().email(),
  password: z
    .string()
    .min(5, { message: "password must be of 5 charecters ! " })
    .max(40),
});

export const postValidation = z.object({
  //all validations for signIn form
  caption: z.string().min(0).max(5000,{message:"caption is too big !"}),
  file: z.custom<File[]>(),
  location: z.string().min(0).max(100,{message:"location is too big !"}),
  tags: z.string(),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});