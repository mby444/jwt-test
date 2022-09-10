import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { User } from "../database/model.js";

const router = Router();

router.get("/", auth, (req, res) => {
    const { email, password } = req.user;
    const options = {
        user: { email, password }
    }
    res.render("dashboard", options);
});

router.get("/logout", (req, res) => {
    res.cookie("logged", { loggedData: "" }, { maxAge: 0 });
    res.redirect("/");
});

router.get("/delete_account", auth, async (req, res) => {
    const { email } = req.user;
    await User.deleteOne({ email });
    res.cookie("logged", {}, { maxAge: 0 });
    res.redirect("/");
});

export default router;