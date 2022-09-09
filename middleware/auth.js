import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const { ACCESS_KEY: accessKey } = process.env;

const auth = (req, res, next) => {
    const logged = req.cookies.logged;
    try {
        if (!logged) throw { message: "Cookie expired" };
        const user = jwt.verify(logged.loggedData, accessKey);
        req.user = user;

        next();
    } catch (err) {
        res.redirect("/login");
    }
};

export { auth };