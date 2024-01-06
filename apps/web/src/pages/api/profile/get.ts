import { siweServer } from "@/utils/siwe-server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await siweServer.getSession(req, res);
  const walletAddress = session?.address?.toLowerCase();
}
