import { Request, Response } from "express";
import prisma from "../lib/prisma";

/**
 * POST /members
 */
export const createMember = async (req: Request, res: Response) => {
  try {
    const { fullName, phone, email } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({
        error: "fullName and phone are required"
      });
    }

    const member = await prisma.member.create({
      data: {
        fullName,
        phone,
        email
      }
    });

    return res.status(201).json(member);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Member with this phone already exists"
      });
    }

    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * GET /members
 */
export const getMembers = async (_req: Request, res: Response) => {
  try {
    const members = await prisma.member.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.json(members);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to fetch members"
    });
  }
};
