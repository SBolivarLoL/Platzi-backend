const pool = require('../libs/postgresPool.js');

const { models } = require('./../libs/sequelize')

class CategoryService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async create(data) {
    const newCategory = await models.Category.create(data)
    return newCategory;
  }

  async find() {
    const query = 'SELECT * FROM tasks';
    const response = await this.pool.query(query);
    return response.rows;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = CategoryService;
