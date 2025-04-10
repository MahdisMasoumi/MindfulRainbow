const Sequelize = require("sequelize");
const config = require("../config");

const RainbowGoals = config.define(
  "rainbow-goals",
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
    start_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    target_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    goal_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    milestones: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    summary: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = RainbowGoals;
