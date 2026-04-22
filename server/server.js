const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const activityRoutes = require("./routes/activity");
const statsRoutes = require("./routes/stats");
const { sendError, sendSuccess } = require("./utils/response");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  sendSuccess(res, { ok: true }, "API healthy");
});

app.use("/api/auth", authRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/stats", statsRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  sendError(res, "Server error", 500);
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error.message);
    process.exit(1);
  }
}

startServer();
