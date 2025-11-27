import { SignInSchema } from "@/utilities/schemaValidate/SignInSchema";
import * as yup from "yup";

declare type TSingInForm = yup.InferType<typeof SignInSchema>;
