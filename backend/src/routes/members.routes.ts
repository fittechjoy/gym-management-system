import { Router } from "express";
import { createMember } from "../controllers/members.controller";

const router = Router();

router.post("/", createMember);

export default router;
