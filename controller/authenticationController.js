const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

const { salt, checkPassword } = require('../helper/bycryptHelper');
const db = require('../models');

class AuthController {
    static async register(req, res, next) {
        try {
            const { fullname, email, phoneNumber, password, latitude, longitude } = req.body;
            const hashPassword = await salt(password).catch(err => {
                return res.status(500).send('password encryption failed')
            })
            const user = await db.users.create({
                fullname,
                email,
                phoneNumber,
                password: hashPassword,
                role: 'user',
                latitude,
                longitude
            })

            delete user.dataValues.password
            res.send(user)
        } catch (err) {
            next(err);
        }
    }

    static async registerAdmin(req, res, next) {
        try {
            const { fullname, email, phoneNumber, password, latitude, longitude } = req.body;
            const hashPassword = await salt(password).catch(err => {
                return res.status(500).send('password encryption failed')
            })
            const user = await db.users.create({
                fullname,
                email,
                phoneNumber,
                password: hashPassword,
                role: 'admin',
                latitude,
                longitude
            })

            delete user.dataValues.password
            res.send(user)
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const body = req.body
            let getUser = await db.users.findAll({
                where: {
                    email: body.email
                }
            })

            if (getUser.length === 0) {
                res.status(404).send("User is not available")
            }
            else {
                const user = getUser[0]
                if (user.dataValues.role === 'admin') {
                    if (body.password === user.dataValues.password) {
                        const token = jwt.sign(user.dataValues, secret, {
                            expiresIn: '365d'
                        })
                        user.dataValues.token = token
                        delete user.dataValues.password
                        return res.send(user.dataValues)
                    } else {
                        res.status(400).send("Wrong Password")
                    }
                } else {
                    const isPassMatch = await checkPassword(body.password, user.dataValues.password)
                    if (!isPassMatch) {
                        res.status(400).send("Wrong Password")
                    } else {
                        const token = jwt.sign(user.dataValues, secret, {
                            expiresIn: '365d'
                        })
                        user.dataValues.token = token
                        delete user.dataValues.password
                        res.send(user.dataValues)
                    }
                }
            }
        } catch (err) {
            next(err);
        }
    }

}


module.exports = AuthController;
