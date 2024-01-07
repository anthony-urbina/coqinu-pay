import { z } from "zod";

export const getUserValidator = z.object({
  twitterUsername: z.string().optional(),
});
