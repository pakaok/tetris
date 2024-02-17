import express, { Express, Request, Response, NextFunction } from "express"; // server
import cors from "cors"; // Cross Origin Site (enables local connection between frontend and backend)
import helmet from "helmet"; // Middleware security
import * as dotenv from "dotenv"; // For environment variables

import { getScores, updateScores } from "./router/scores";
import { getSettings, updateSettings } from "./router/settings";

dotenv.config();
// Exit if no ENV found
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = Number(process.env.PORT as string);
const app: Express = express();

// Enable CORS and middleware
app.use(helmet());
app.use(cors());

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log("Node js server running");
  console.log(`⚡️ Server running at http://localhost:${PORT}`);

  // Express Timestamp
  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();
  console.log(`Server started at: ${hour}:${minute}`);
});

// Base endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScipt server is running");
});

// Scores
app.get("/scores", getScores);
app.post("/scores", updateScores);

// Settings
app.get("/settings", getSettings);
app.post("/settings", updateSettings);
