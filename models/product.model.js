
module.exports = (sequelize, Sequelize) =>{
    const Product = sequelize.define("product", {
        product_Id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price:{
            type: Sequelize.INTEGER,
            allowNull: false
         }
    });
    return Product;
}