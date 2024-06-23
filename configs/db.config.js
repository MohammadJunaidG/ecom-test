require("dotenv").config()
const env = process.env

module.exports = {
    development: {
        HOST: env.HOST,
        USER: env.USER,
        PASSWORD: env.PASSWORD,
        DB: env.DB,
        dialect: env.dialect,
        pool: {
            max: env.max,
            min: env.min,
            acquire: env.acquire,
            idle: env.idle
        }
    }
}