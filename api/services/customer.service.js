const boom = require('@hapi/boom');
const sequelize = require('./../libs/sequelize');

class CustomerService {
  constructor() {}

  async create(data) {
    const newCustomer = await sequelize.models.Customer.create(data, {
      include: ['user']
    });
    return newCustomer;
  }

  async find() {
    const response = await sequelize.models.Customer.findAll({
      include: ['user']
    });
    return response;
  }

  async findOne(id) {
    const customer = await sequelize.models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const response = await model.update(changes);
    return response;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { id };
  }
}

module.exports = CustomerService;
