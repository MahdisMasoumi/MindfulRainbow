const Sequelize = require("sequelize");
const config = require("../config");

const TherapyTracker = config.define(
  "therapy-tracker",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    emotion_before: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    emotion_after: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    summary: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    reminder: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = TherapyTracker;
