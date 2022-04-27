const { Router } = require('express');
const router = Router();

router.get("/register", (req, res) => {
    res.render("registrar");
});

module.exports = router;