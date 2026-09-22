import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { supabase } from "./config/supabase";
import { notFoundHandler } from "./middlewares/not-found.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import commentRoutes from "./routes/comment.routes";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.json({
    message: "Blog REST API is running"
  });
});

app.get("/health/db", async (_req, res, next) => {
  try {
    const { error } = await supabase
      .from("users")
      .select("id")
      .limit(1);

    if (error) {
      return res.status(500).json({
        message: "Database connection failed"
      });
    }

    return res.json({
      message: "Database connection successful"
    });
  } catch (error) {
    next(error);
  }
});

// Resource routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

// Handle unknown routes after all API routes.
app.use(notFoundHandler);

// Handle unexpected application errors.
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});