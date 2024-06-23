const env = process.env.NODE_ENV || 'development'
const {
    HOST, USER, PASSWORD, DB,
    dialect, min, max, acquire, idle,
    development
} = require("../configs/db.config")[env]

const Sequelize = require("sequelize")

const sequelize = new Sequelize(
    DB, USER, PASSWORD,
    {
        HOST, dialect,
        pool: { max, min, acquire, idle }
    }
)
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.user = require("./user.model")(sequelize, Sequelize)
db.role = require("./role.model")(sequelize, Sequelize)
db.product = require("./product.model")(sequelize, Sequelize)
db.category = require("./category.model")(sequelize, Sequelize)
db.cart = require("./cart.model")(sequelize, Sequelize)



// db.product.belongsTo(db.category);
db.category.hasMany(db.product, {
    foreignKey: 'categoryId'
});
db.product.belongsTo(db.category, {
    foreignKey: 'categoryId'
})

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
})
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});



db.user.hasOne(db.cart);
db.cart.belongsTo(db.user);

db.product.belongsToMany(db.cart, {
    through: "cart_products",
    foreignKey: "productId",
    otherKey: "cartId"
});

db.cart.belongsToMany(db.product, {
    through: "cart_products",
    foreignKey: "cartId",
    otherKey: "productId"
});


module.exports = db