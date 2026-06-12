import "dotenv/config"
import express from "express"
import cors from "cors"
import { connectToDB } from "../config/db.js"
import { notfound, errorHandler } from "../middleware/errorHandling.js"

import habitRoutes from "../routes/habit.js"

import authRoutes from "../routes/auth.js"

import logRoutes from "../routes/logs.js"
import { login } from "../controller/authController.js"
import aiRoutes from "../routes/ai.js"

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, cb) {
    // Postman, curl, server-to-server
    if (!origin) {
      return cb(null, true);
    }

    // localhost during development
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return cb(null, true);
    }

    // origins from .env
    if (allowedOrigins.includes(origin)) {
      return cb(null, true);
    }

    return cb(
      new Error(`Origin ${origin} not allowed by CORS`)
    );
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],
};

app.use(cors(corsOptions))
app.options("*", cors(corsOptions))
app.use(express.json({limit:"1mb"}))

app.get('/api/health', (req, res)=>{
res.json({status: "ok", time: new Date().toISOString()})
})

app.use("/api/auth", authRoutes)
app.use("/api/habits", habitRoutes)
app.use("/api/logs", logRoutes)
app.use("/api/ai", aiRoutes);
app.use(notfound)
app.use(errorHandler)

const PORT = process.env.PORT || 8000;

connectToDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server running on ${PORT}`);
        
    })
})