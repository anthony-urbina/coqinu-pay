import { z } from "zod";
import { useForm } from "react-hook-form";

export const profileSchema = z.object({
  displayName: z.string().min(1).max(255),
  twitterUsername: z
    .string()
    .min(1)
    .max(15)
    .regex(
      /^[A-Za-z][A-Za-z0-9_]*$/,
      "Twitter username must start with a letter and contain only letters, numbers, and underscores"
    ),
});

export type ProfileSchema = z.infer<typeof profileSchema>;

export type ProfileSchemaError = ReturnType<typeof useForm<ProfileSchema>>["formState"]["errors"];

export type ProfileSchemaControl = ReturnType<typeof useForm<ProfileSchema>>["control"];
