import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import router from "./routes/web.js";
import { connectdb } from "./db/connectdb.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

// Middleware
app.use(express.urlencoded({ extended: true }));

// Session setup (if needed)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Set the template engine
app.set("view engine", "ejs");

// Database connection
connectdb(DATABASE_URL);
// .then(() => console.log("Database connected successfully"))
// .catch((err) => {
//   console.error("Database connection error:", err);
//   process.exit(1); // Exit on connection error
// });

// Routes
app.use("/", router);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
