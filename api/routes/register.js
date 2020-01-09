const express = require('express');
const router = express.Router();
const storage = require('node-sessionstorage');

router.post('/', (req, res, next) => {
    const { regName, email, phone } = req.body;
    storage.setItem('regData', JSON.stringify(req.body));
    if(regName && email && phone) {
        res.status(200).json({
            reponse: {
                msg: 'Register Successfully'
            }
        });
    } else {
        res.status(404).json({
            reponse: {
                error: "Please enter all the fields to register"
            }
        });
    }
});

module.exports = router;