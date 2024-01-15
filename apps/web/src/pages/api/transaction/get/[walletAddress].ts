import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { transactionGetValidator } from "../../../../../../../packages/schemas/transaction/get";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { walletAddress } = transactionGetValidator.parse(req.query);

  // look up user by wallet address

  const user = await prisma.user.findUnique({
    where: {
      walletAddress: walletAddress,
    },
  });

  if (!user) {
    throw new Error("User not found for the wallet address: " + walletAddress);
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [
          {
            fromUser: user,
          },
          {
            toUser: user,
          },
        ],
      },
    });

    if (!transactions || transactions.length === 0) {
      throw new Error("No transactions found for user: " + user.id);
    }

    const sent = transactions
      .filter((transaction) => transaction.fromUserId === user.id)
      .map((transaction) => ({
        direction: "sent",
        value: transaction.value,
        link: `https://snowtrace.io/tx/${transaction.txHash}`,
      }));

    const received = transactions
      .filter((transaction) => transaction.toUserId === user.id)
      .map((transaction) => {
        return {
          direction: "received",
          value: transaction.value,
          link: `https://snowtrace.io/tx/${transaction.txHash}`,
        };
      });

    const reponse = {
      sent,
      received,
    };

    res.status(200).json(reponse);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error finding transactions" });
  }
}
