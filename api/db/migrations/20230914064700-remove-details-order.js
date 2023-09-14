'use strict';

const { OrderSchema, ORDER_TABLE } = require('./../models/order.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn(ORDER_TABLE, 'details');
  },

  down: async (queryInterface) => {
    await queryInterface.addColumn(ORDER_TABLE, 'details', OrderSchema.details);
  },
};
