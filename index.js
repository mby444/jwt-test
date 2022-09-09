import "./database/connection.js";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index.js";
import dashboardRouter from "./routes/dashboard.js";
import notFoundRouter from "./routes/not-found.js";

dotenv.config();

const app = express();
const { PORT: port } = process.env;

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", indexRouter);
app.use("/dashboard", dashboardRouter);
app.use("*", notFoundRouter);

app.listen(port, () => {
    console.log(`Server running at port ${port}...`);
});