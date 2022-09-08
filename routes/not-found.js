import { Router } from "express";

const router = Router();

router.use((req, res) => {
    res.sendStatus(404);
});

export default router;