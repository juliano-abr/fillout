import { Router } from "express";
import { getFilteredResponses } from "../controllers/forms";

const router = Router();

router.get("/:id/filteredResponses", getFilteredResponses);

export default router;
