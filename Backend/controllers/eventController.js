const Event = require("../models/Event");
const { Op } = require("sequelize");

exports.getEvents = async (req, res) => {
  console.log("at evenet controllers ");
  try {
    const events = await Event.findAll({ where: { userId: req.user.id } });
    console.log("Events ",events);
    res.json(events);
  } catch (error) {
    console.log("error in fetching event ",error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};



exports.getEventsByMonth = async (req, res) => {
  const { year, month } = req.query; // Expect year and month as query parameters

  console.log("Reached backend for current month events:", year, month, req.user.id);

  if (!year || month === undefined) {
    return res.status(400).json({ error: "Year and month are required" });
  }

  try {
    const startDate = new Date(year, month, 1); // First day of the month
    const endDate = new Date(year, parseInt(month) + 1, 1); // First day of the next month

    const events = await Event.findAll({
      where: {
        userId: req.user.id,
        date: {
          [Op.gte]: startDate, // Greater than or equal to the start of the month
          [Op.lt]: endDate, // Less than the start of the next month
        },
      },
    });

    console.log("Events of current month:", events);
    res.json(events);
  } catch (error) {
    console.error("Error fetching events by month:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};



exports.createEvent = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const event = await Event.create({ title, description, date, userId: req.user.id });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
  }
};

exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date } = req.body;
  try {
    const event = await Event.findByPk(id);
    if (event.userId !== req.user.id) return res.status(403).json({ error: "Unauthorized" });

    await event.update({ title, description, date });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to update event" });
  }
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByPk(id);
    if (event.userId !== req.user.id) return res.status(403).json({ error: "Unauthorized" });

    await event.destroy();
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
};
