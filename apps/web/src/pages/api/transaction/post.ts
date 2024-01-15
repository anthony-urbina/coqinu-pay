import { siweServer } from "@/utils/siwe-server";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { transactionPostValidator } from "../../../../../../packages/schemas/transaction/post";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { value, from, hash, to } = transactionPostValidator.parse(req.body);

  let fromUser = await prisma.user.findUnique({
    where: {
      walletAddress: from,
    },
  });

  const toUser = await prisma.user.findUnique({
    where: {
      walletAddress: to,
    },
  });

  if (!toUser) {
    throw new Error("User not found for the to wallet address: " + to);
  } else if (!fromUser) {
    console.log("from user not found, creating");
    fromUser = await prisma.user.create({
      data: {
        walletAddress: from,
      },
    });
  }
  console.log("users found, creating transaction");

  try {
    const tx = await prisma.transaction.create({
      data: {
        value,
        txHash: hash,
        fromUserId: fromUser.id,
        toUserId: toUser.id,
      },
    });
    console.log("transaction created", tx);

    res.status(200).json({ message: "Transaction created successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error creating transaction" });
  }
}
