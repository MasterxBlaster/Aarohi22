const router = require('express').Router();
const { getHome } = require('../../controllers/home/home');


router.route('/').get(getHome)


module.exports = router;