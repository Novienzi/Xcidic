

const db = require("../models")


class UserController {

    static async getUser(req, res, next) {
        try {
            const user = await db.users.findAll({
                where: { id: req.query.id }
            })
            if (user.length > 0) {
                res.status(200).send(user)
            } else {
                res.status(404).send('id not found')
            }
        } catch (err) {
            next(err);
        }
    }

    static async editProfile(req, res, next) {
        try {
            let query = req.query
            let body = req.body

            const getUser = await db.users.findAll({
                where: {
                    id: query.id
                }
            }).catch((err) => next(err))
            if (getUser.length === 0) {
                return res.status(409).send("Id not found")
            }
            // //** menginputkan data ke database */
            const updatedUser = await db.users.update(body, {
                where: {
                    id: query.id
                }
            })
            if (updatedUser == 0) {
                res.send("There is no data updated")
                return;
            }
            if (updatedUser == 1) {
                const getDataUpdated = await db.users.findAll({
                    where: {
                        id: query.id
                    }
                })
                res.send(getDataUpdated)
            }

        } catch (err) {
            next(err);
        }
    }

}

module.exports = UserController;