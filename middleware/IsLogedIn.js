const isLogedIn = (req, res, next) => {
    
    if(!req.user){
        console.log('not loggeduser:', req.user)
        return res.status(401).json({msg:'Unauthoriezd', success:false})
    }
    console.log("have user: ",req.user)
    next()
}

module.exports = {
    isLogedIn
}