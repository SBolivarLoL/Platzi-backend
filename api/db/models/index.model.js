import { User, UserSchema } from './user.model.js';
import { Product, ProductSchema } from './product.model.js';
import { Order, OrderSchema } from './order.model.js';
import { Category, CategorySchema } from './category.model.js';

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
}

export default setupModels;
