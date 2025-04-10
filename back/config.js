const Sequelize = require("sequelize");
const config = new Sequelize("mindfullrainbow", "root", "Marshal1053.", {
  dialect: "mariadb",
  host: "127.0.0.1",
});
module.exports = config;
