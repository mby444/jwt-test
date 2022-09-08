import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/signup", (req, res) => {
    const options = {
        type: "signup"
    };

    res.render("sign-form", options);
});

router.get("/login", (req, res) => {
    const options = {
        type: "login"
    };

    res.render("sign-form", options);
});

export default router;