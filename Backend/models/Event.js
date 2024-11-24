const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");

const Event = sequelize.define("Event", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Event.belongsTo(User, { foreignKey: "userId" });
module.exports = Event;
