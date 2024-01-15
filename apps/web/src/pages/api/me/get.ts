import { prisma } from "@/lib/prisma";
import { siweServer } from "@/utils/siwe-server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await siweServer.getSession(req, res);
  const walletAddress = session?.address?.toLowerCase();
  if (!walletAddress) {
    return res.status(403).json({ message: "You must be signed in to view your profile" });
  }

  const user = await prisma.user.findUnique({
    where: { walletAddress },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
}
