const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

class ProductsService {
  constructor() {}

  async create(data) {
    const newPrduct = await models.Product.create(data);
    return newPrduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const { price } = query;
    if (price) {
      options.where.price = price;
    }
    const { priceMin, priceMax } = query;
    if (priceMin && priceMax) {
      options.where.price = {
        [Op.gte]: priceMin,
        [Op.lte]: priceMax,
      };
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlocked) {
      throw boom.conflict('product blocked');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const response = await product.update(changes);
    return response;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductsService;
