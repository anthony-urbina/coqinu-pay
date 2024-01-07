import { z } from "zod";

export const patchUserValidator = z.object({
  displayName: z.string(),
  twitterUsername: z.string(),
});
