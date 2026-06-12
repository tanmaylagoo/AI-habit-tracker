import express from "express"

import {
    getHabits,
    createhabit,
    updatehabit,
    deletehabit,
    archiveHabit,
    reorderHabits
} from "../controller/habitController.js"

import {protect} from "../middleware/auth.js"

const router = express.Router();

router.use(protect);

router.get("/", getHabits)
router.post("/", createhabit)
router.put("/:id", updatehabit)
router.delete("/:id", deletehabit)
router.put("/:id/archive", archiveHabit)
router.put("/reorder", reorderHabits)

export default router;
