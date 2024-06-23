 exports.signup = async (req, res) => {
        const userObj = { username, email, password } = req.body
        try {
            const user = await User.create(userObj)
            if (req.body.roles) {
                const userRole = await Role.findOne({
                    where: { name: { [Op.or]: req.body.role } }
                })
                await user.setRoles(userRole)
                await countUsersByRole()
                res.status(201).send({ messgae: "User has been created successfully." })
            } else {
                const userRole = await Role.findAll({
                    where: { name: "customer" }
                })
                await user.setRoles(userRole)
                await countUsersByRole()
                console.log(user);
                res.status(201).send({ messgae: "User has been created successfully." })
            }
        } catch (error) {
            res.send(500).status({ message: "Some internal error." })
            console.log(error)
        }
    }
    
    async function countUsersByRole() {
        try {
            const result = await Role.findAll({
                attributes: ['name', [Sequelize.fn('COUNT', Sequelize.col('users.id')), 'userCount']],
                include: [{
                    model: db.user,
                    attributes: [],
                    through: { attributes: [] }
                }],
                group: ['Role.id'],
                order: [[Sequelize.literal('userCount'), 'DESC']]
            });
    
            console.log("Result $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$\n", result)
            let countArray = result.map(role => ({
                name: role.name,
                userCount: role.get('userCount')
            }));
            console.log(`countArray========== ${countArray}`);
            for (let i = 0; i < countArray.length; i++) {
                let role = await db.role.findOne({ where: { name: countArray[i].name } })
                role.totalUsers = countArray[i].userCount
                role.save();
            }
    
        } catch (error) {
            console.error(error);
            throw new Error('Error counting users by role');
        }
    }
    