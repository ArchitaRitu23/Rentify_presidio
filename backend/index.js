const express = require("express");
const userRouter = require("./Route/User");
const sellerRouter = require("./Route/Seller");
const propertyRouter = require("./Route/Property");
const connection = require("./connection");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sellerAuth = require("./Middleware/sellerAuth");
const auth = require("./Middleware/auth");
const app = express();

dotenv.config();
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));

app.use(express.json());
app.use(cookieParser());

app.get("/seller-auth", sellerAuth);
app.get("/auth", auth);
app.use("/user", userRouter);
app.use("/seller", sellerRouter);
app.use("/property", propertyRouter);

// error handling
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";

  return res.status(status).json({
    error: {
      status,
      message,
    },
  });
};

app.use(errorHandler);

// check connection
connection
  .authenticate()
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("Cannot connect to database"));

// connection
//   .sync()
//   .then(() => console.log("tables created"))
//   .catch((err) => console.log(err));

const init = () => {
  console.log("Server started changed....");
};

app.listen(9000, init);
