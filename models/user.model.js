const {genSaltSync, hashSync } = require("bcryptjs")
module.exports = (sequelize, Sequelize) =>{
    const User = sequelize.define("user", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            validate:{ 
                isEmail: true
            }
        },
        password:{
            type: Sequelize.STRING,
            validate: {
                len : [ 5 -15]
            },
            set(value){
                const salt = genSaltSync(10)
                const hash = hashSync(value, salt)
                this.setDataValue('password', hash)
            }
         }
    });
    return User;
}