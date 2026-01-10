import { Router } from "express";
import {
  createMember,
  getMembers,
  searchMembers
} from "../controllers/members.controller";

const router = Router();

router.post("/", createMember);
router.get("/", getMembers);
router.get("/search", searchMembers);

export default router;
