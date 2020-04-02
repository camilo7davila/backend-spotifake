const auth = require('../../auth/index')

module.exports = function checkAuth(action) {

    function middleware(req, res, next) {
        switch (action) {
            case 'postCreate':
                const owner = req.body.idAuthor
                auth.check.own(req, owner);
                next()
                break;

            default:
                next();
        }
    }
    
    return middleware
}