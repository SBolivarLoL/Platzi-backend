const { User, UserSchema } = require('./user');
const { Product, ProductSchema } = require('./product');
const { Order, OrderSchema } = require('./order');
const { Category, CategorySchema } = require('./category');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
}

module.exports = setupModels;
