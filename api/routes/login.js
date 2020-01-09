const express = require('express');
const router = express.Router();
const storage = require('node-sessionstorage');

router.post('/', (req, res, next) => {
    const { name, pwd } = req.body;
    const newData = storage.getItem('regData');
    const data = JSON.parse(newData?newData:false);
    if(name && pwd) {
        res.status(200).json({
            reponse: {
                status: 200,
                msg: `HI!! ${name} Login Successfully`,
                userName: data && data.regName
            }
        });
    } else {
        res.status(404).json({
            reponse: {
                error: "Username or password is incorrect"
            }
        });
    }
});

module.exports = router;