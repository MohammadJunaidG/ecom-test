
module.exports = (sequelize, Sequelize) =>{
    const Category = sequelize.define("category", {
        id:{
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
        totalProducts:{
            type: Sequelize.INTEGER,
            defaultValue: 0
         }
    });
    return Category;
}