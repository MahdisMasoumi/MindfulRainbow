const Sequelize = require("sequelize");
const config = require("../config");

const MoodTracking = config.define(
  "mood-tracking",
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
    emoji_img: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    notes: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    intensity: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = MoodTracking;
