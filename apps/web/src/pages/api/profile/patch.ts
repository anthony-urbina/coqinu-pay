import { siweServer } from "@/utils/siwe-server";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST" && req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await siweServer.getSession(req, res);
  console.log("session", session);
  const walletAddress = session?.address?.toLowerCase();

  if (!walletAddress) {
    return res.status(403).json({ message: "Unauthorized request" });
  }

  const { displayName, twitterUsername } = req.body;

  try {
    await prisma.user.upsert({
      where: { walletAddress },
      update: {
        displayName,
        twitterUsername,
      },
      create: {
        walletAddress: walletAddress,
      },
    });

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error updating profile" });
  }
}
