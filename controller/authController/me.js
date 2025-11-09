const GETME = (req, res) => {
  if (req.user) {
    return res.status(200).json(req.user)
  } else {
    return res.status(401).json({ message: 'Not logged in' })
  }
}

module.exports = { GETME }
