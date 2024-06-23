
module.exports = (sequelize, Sequelize) =>{
    const Role = sequelize.define("role", {
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
        totalUsers: {
            type: Sequelize.INTEGER,
            defalutValue: 0
        }
        
    });
    return Role;
}