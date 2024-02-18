const jwt = require('jsonwebtoken')
const authMiddleware = async(req, res, next) => {
    try {
        const Authorization = req.headers.authorization || req.headers.Authorization
        if (Authorization && Authorization.startsWith('Bearer')) {
            const token = Authorization.split(' ')[1]
            jwt.verify(token, process.env.SECRECT_KEY, (error, decode) => {
                if (error) {
                    return res.status(401).json({
                        success: false,
                        message: 'Unauthorized no token'
                    })
                }
                req.user = decode
                console.log(req)
                next()
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

module.exports = authMiddleware;