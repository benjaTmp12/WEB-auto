'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Anuncios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      marca: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      modelo: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      anio: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      precio: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      km: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      foto_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      estado: {
        type: Sequelize.ENUM('activo', 'vendido'),
        defaultValue: 'activo',
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('Anuncios', ['marca']);
    await queryInterface.addIndex('Anuncios', ['estado']);
    await queryInterface.addIndex('Anuncios', ['precio']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Anuncios');
  },
};
