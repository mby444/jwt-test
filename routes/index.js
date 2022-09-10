import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../database/model.js";

const router = Router();
const { ACCESS_KEY: accessKey } = process.env;

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/signup", (req, res) => {
    const options = {
        error: null,
        type: "signup"
    };

    res.render("sign-form", options);
});

router.get("/login", (req, res) => {
    const options = {
        error: null,
        type: "login"
    };

    res.render("sign-form", options);
});

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const oldUser = await User.findOne({ email });
    if (oldUser) return res.render("sign-form", { error: "User already exists!", type: "signup" });
    const hashedPassword = await bcrypt.hash(password, 10);
    await new User({ email, password: hashedPassword }).save();

    res.redirect("/login");
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const options = {
        error: null,
        type: "login"
    };
    const oldUser = await User.findOne({ email });

    if (!oldUser) {
        options.error = "You have not signed yet!";
        return res.render("sign-form", options);
    }
    const isPassword = await bcrypt.compare(password, oldUser.password);
    
    if (!isPassword) {
        options.error = "Incorrect password!";
        return res.render("sign-form", options);
    }

    const loggedData = jwt.sign({ email, password }, accessKey, { expiresIn: "1h" });
    res.cookie("logged", { loggedData }, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

    res.redirect("/dashboard");
});

export default router;