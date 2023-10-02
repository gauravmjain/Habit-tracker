const express = require('express');
const router = express.Router();
const passport = require('passport');

const habitController = require('../controller/habit_conntroller');



router.post('/create',passport.checkAuthentication,habitController.create);
router.get('/show_dates',habitController.showDates);
router.post('/done',habitController.done);
router.get('/render-dones',habitController.renderDones)

router.get('/hide_dates',habitController.hideDate)

module.exports = router;
