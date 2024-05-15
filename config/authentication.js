const isAuthenticated = {
    isAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()){
            next();
        } else {
            res.status(403).send('Authentication not authorized');
        }
    }
}




module.exports = isAuthenticated
