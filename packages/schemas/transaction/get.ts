import { z } from "zod";

export const transactionGetValidator = z.object({
  walletAddress: z.string(),
});
