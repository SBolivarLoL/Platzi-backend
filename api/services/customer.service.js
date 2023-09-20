const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const { hashPassword } = require('./../libs/hash');

class CustomerService {
  constructor() {}

  async create(data) {
    const hashedPassword = await hashPassword(data.user.password);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hashedPassword,
      },
    };
    const newCustomer = await models.Customer.create(newData, {
      include: ['user'],
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async find() {
    const response = await models.Customer.findAll({
      include: ['user'],
    });
    return response;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
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
