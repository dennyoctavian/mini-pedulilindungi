"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
      },
      statusVaccine: {
        type: Sequelize.ENUM(
          "No Vaccine",
          "Vaccine 1",
          "Vaccine 2",
          "Vaccine 3"
        ),
      },
      statusCovid: {
        type: Sequelize.ENUM("Possitive", "Negative"),
      },
      role: {
        type: Sequelize.ENUM("admin", "citizen"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
