import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  let user;
  try {
    user = await prisma.user.findMany({
      select: {
        twitterUsername: true,
        walletAddress: true,
        displayName: true,
        profileImageUrl: true,
        id: true,
        _count: {
          select: {
            receivedTransactions: true,
            sentTransactions: true,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting users" });
  }

  if (!user || user.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }

  res.status(200).json(user);
}
