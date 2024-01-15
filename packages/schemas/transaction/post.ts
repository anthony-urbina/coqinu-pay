import { z } from "zod";

export const transactionPostValidator = z.object({
  to: z.string(),
  from: z.string(),
  value: z.number(),
  hash: z.string(),
});
