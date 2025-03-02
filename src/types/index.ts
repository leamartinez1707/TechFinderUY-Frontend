import { z } from "zod";
import { signUpSchema } from "../schemas/auth-schema";



export type SignUp = z.infer<typeof signUpSchema>;