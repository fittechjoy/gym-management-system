import { Router } from "express";
import { createCheckIn } from "../controllers/checkins.controller";

const router = Router();

router.post("/", createCheckIn);

export default router;
