import express from "express";
import connect from "./config/dbConnect.js";
import livros from "./models/Livro.js";
import routes from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();

const db = connect(process.env.DB_USER, process.env.DB_PASSWORD);

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const app = express();
app.use(express.json());
routes(app);

export default app;
