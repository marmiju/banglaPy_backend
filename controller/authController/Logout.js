const LogOut = (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ message: "Logout failed" });
      }

      req.session.destroy(() => {
        const FRONTEND_URL = process.env.FRONTEND_URL;
        res.redirect(`${process.env.FRONTEND_URL}/`)

      });
    });
  } catch (err) {
    console.error("Unexpected logout error:", err);
    res.status(500).json({ message: "Unexpected logout error" });
  }
};

module.exports = { LogOut };
