import express from "express";
import dotenv from "dotenv";
import studentRoutes from "./routes/student.routes.js";
import courseRoutes from "./routes/course.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import authenticateRoutes from "./routes/authentication.routes.js";
import { serveSwagger, setupSwagger } from "./config/swagger.js";
import validateJWT from "./middleware/validateJWT.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/docs", serveSwagger, setupSwagger);

app.use("/", authenticateRoutes);
app.use("/students", validateJWT, studentRoutes);
app.use("/courses", validateJWT, courseRoutes);
app.use("/teachers", validateJWT, teacherRoutes);

app.get("/", (req, res) => res.send("Welcome to School API!"));

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
