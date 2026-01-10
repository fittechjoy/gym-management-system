import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}).on("error", (err: any) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use`);
    process.exit(1);
  }
});

