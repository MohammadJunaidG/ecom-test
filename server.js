const express = require("express")
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.json())
require("dotenv").config()
const db = require("./models")
const { log } = require("console")
const Sequelize = db.Sequelize
const userData = require("./seedData/userData.json")
const roleData = require("./seedData/roleData.json")
const { Op } = Sequelize

db.sequelize.sync({ force: true }).then(() => {
    init()
})

async function init() {

    const createdUsers = await db.user.bulkCreate(userData)
    log("########### Initial users created ###########")

    await db.role.bulkCreate(roleData)
    log("########### Initial Roles created ###########")

    await db.category.bulkCreate(categoryData)
    log("########### Initial Categories created ###########")

    await db.product.bulkCreate(productData)
    log("########### Initial Products created ###########")

    //Assigning roles to the users;
    for (let i = 0; i < createdUsers.length; i++) {
        log("userData####################################")
        log(userData[i].roles);
        const userRoles = await db.role.findAll({
            where: {
                name: { [Op.or]: userData[i].roles }
            }
        })
        await createdUsers[i].setRoles(userRoles);
        console.log("userRoles_+++++++++++++++++++====================");
        console.log(userRoles);
    }

    let countArray = await countUsersByRole()
    
    log(countArray, "countArraycountArraycountArraycountArray")
    for (let i = 0; i < countArray.length; i++) {
        let role = await db.role.findOne({ where: { name: countArray[i].name } })
        role.totalUsers = countArray[i].userCount
        role.save();
    }

    const categories = await db.category.findAll()
    for (let index = 0; index < categories.length; index++) {
        let products = await db.product.findAll({ where: { categoryId: categories[index].id } })
        categories[index].totalProducts = products.length
        await categories[index].save()
    }
}

async function countUsersByRole() {
    try {
        const result = await db.role.findAll({
            attributes: ['name', [Sequelize.fn('COUNT', Sequelize.col('users.id')), 'userCount']],
            include: [{
                model: db.user,
                attributes: [],
                through: { attributes: [] }
            }],
            group: ['Role.id'],
            order: [[Sequelize.literal('userCount'), 'DESC']]
        });

        log("Result $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$\n", result)

        let count = result.map(role => ({
            name: role.name,
            userCount: role.get('userCount')
        }));
        console.log("Count::::: ", count);
        return count;
    } catch (error) {
        console.error(error);
        throw new Error('Error counting users by role');
    }
}

require("./routes/auth.user")(app)


app.listen(process.env.PORT,
    () => console.log(`Server has been started on port number ${process.env.PORT}`)
)
