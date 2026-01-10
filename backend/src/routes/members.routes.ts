import { Router } from "express";
import {
  createMember,
  getMembers
} from "../controllers/members.controller";

const router = Router();

router.post("/", createMember);
router.get("/", getMembers);

export default router;
