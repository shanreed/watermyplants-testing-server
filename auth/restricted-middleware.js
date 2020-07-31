module.exports = (req, res, next) => {
    if(req.session && req.session.hub) {
        next();
    } else {
        res.status(401).json({message: 'You must be logged in to do that'});
    }
    
}