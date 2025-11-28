const isLogedIn = (req, res, next) => {
    
    if(!req.user){
        return res.status(401).json({msg:'Unauthoriezd', success:false})
    }
    next()
}

module.exports = {
    isLogedIn
}