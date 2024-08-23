import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conenctDB from "./config/database.js";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
dotenv.config();

//app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Adjust according to your frontend domain
  credentials: true // Allows cookies to be sent and received
}));

//db connection
conenctDB();

//api endpint
app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);


//error middleware
app.use((err,req,res,next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error!';
  res.status(statusCode).json({
    success:false,
    status:statusCode,
    message
  });
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}...`);
});
