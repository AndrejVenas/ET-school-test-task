const Router = require("express")
const router = new Router();
const aboutController = require('../controller/about.controller');

router.get('/about', aboutController.showAbout);


module.exports = router;