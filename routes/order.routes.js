const Router = require("express");
const router = new Router();
const orderController = require('../controller/order.controller');

router.post('/order', orderController.getOneOrder);
router.get('/order', orderController.showOrder);

module.exports = router;