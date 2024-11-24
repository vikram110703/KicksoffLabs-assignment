const express = require("express");
const { getEvents, createEvent, updateEvent, deleteEvent, getEventsByMonth } = require("../controllers/eventController");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authenticate, getEvents);
router.post("/", authenticate, createEvent);
router.get("/currentMonth", authenticate, getEventsByMonth);
router.put("/:id", authenticate, updateEvent);
router.delete("/:id", authenticate, deleteEvent);

module.exports = router;
