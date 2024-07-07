const express = require('express');
const router = express.Router();

router.all('*', (req, res) => {
    res.status(404).json({
        message: 'Invalid route - Check for typos!',
    });
});

module.exports = router;