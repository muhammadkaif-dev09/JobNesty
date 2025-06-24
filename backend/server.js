const express = require("express");
const database = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const cors = require("cors");
const path = require("path");

const app = express();
database();
const _dirname = path.resolve();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
// app.use((req, res, next) => {
//   console.log("➡️ Route hit:", req.method, req.path);
//   next();
// });

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.use(express.static(path.join(_dirname, "/client/dist")));
app.get(/(.*)/, (_, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("Backend is Running on PORT 3000");
});
