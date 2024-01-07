import { NextApiRequest, NextApiResponse } from "next";
import { getUserValidator } from "../../../../../../../packages/schemas/user/get";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { twitterUsername } = getUserValidator.parse(req.query);

  if (!twitterUsername) {
    return res.status(400).json({ message: "Missing twitterUsername paramater" });
  }
  console.log("twitterUsername", twitterUsername);
  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        twitterUsername,
      },
      select: {
        twitterUsername: true,
        walletAddress: true,
      },
    });
    console.log("user", user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting user" });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
}
