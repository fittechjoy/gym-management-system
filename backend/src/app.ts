import express from "express";
const cors = require("cors");

import membersRoutes from "./routes/members.routes";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/members", membersRoutes);

// health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
