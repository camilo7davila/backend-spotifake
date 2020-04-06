const auth = require('../../auth/index')

module.exports = function checkAuth(action) {

    function middleware(req, res, next) {
        switch (action) {
            case 'postCreate':
                const owner = req.body.idAuthor
                auth.check.own(req, owner);
                next()
                break;
            case 'postDelete':
                const owner_delete = req.body.idAuthor
                auth.check.own(req, owner_delete);
                next()
                break;

            default:
                next();
        }
    }
    
    return middleware
}