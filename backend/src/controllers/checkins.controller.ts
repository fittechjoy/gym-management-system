import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const createCheckIn = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.body;

    if (!memberId) {
      return res.status(400).json({
        error: "memberId is required"
      });
    }

    const member = await prisma.member.findUnique({
      where: { id: memberId }
    });

    if (!member) {
      return res.status(404).json({
        error: "Member not found"
      });
    }

    if (member.status !== "ACTIVE") {
      return res.status(403).json({
        error: "Membership is not active"
      });
    }

    // prevent rapid duplicate check-ins (5 mins)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const recentCheckIn = await prisma.checkIn.findFirst({
      where: {
        memberId,
        scannedAt: {
          gte: fiveMinutesAgo
        }
      }
    });

    if (recentCheckIn) {
      return res.status(429).json({
        error: "Member already checked in recently"
      });
    }

    const checkIn = await prisma.checkIn.create({
      data: { memberId }
    });

    return res.status(201).json(checkIn);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to check in"
    });
  }
};
