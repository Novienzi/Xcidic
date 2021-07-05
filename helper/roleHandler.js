function adminRoleHandler(req, res, next) {

    if (req.user.role === 'admin') {
        next()
    } else {
        res.status(401).send('You are not an admin')
    }
}

function userRoleHandler(req, res, next) {

    if (req.user.role === 'user') {
        next()
    } else {
        res.status(401).send('You are not an user')
    }
}

module.exports = {
    adminRoleHandler,
    userRoleHandler
}
