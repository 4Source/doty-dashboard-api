const { DataTypes } = require("sequelize");
const db = require('../database');


const DiscordUser = db.define("discord_user", {
    //Tabel Rows
    user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
  }, {
    //Configuration Sequelize
    timestamps: false
  });
  
  module.exports = DiscordUser;