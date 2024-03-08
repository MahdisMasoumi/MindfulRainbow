const Sequelize = require("sequelize");
const config = require("../config");

const RainbowRays = config.define(
  "rainbow-rays",
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
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    days: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    images: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    notes: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = RainbowRays;
