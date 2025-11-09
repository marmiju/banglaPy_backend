
const GETME = (req, res) => {
  if (req.user) {
    return res.json(req.user)
  } else {
   
    const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'
    return res.redirect(FRONTEND_URL)  
  }
}
module.exports = { GETME }