
module.exports = (sequelize, Sequelize) =>{
    const Cart = sequelize.define("cart", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cart_items: {
            type: Sequelize.INTEGER
        },
        totalValue:{
            type: Sequelize.INTEGER,
            defaultValue: 0
         }
    });
    return Cart;
}