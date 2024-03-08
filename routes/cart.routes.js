const Router = require("express")
const router = new Router();
const cartController = require('../controller/cart.controller');

router.post('/cartorder', cartController.createOrder);
router.post('/cart', cartController.getCart);
router.get('/cart', cartController.loadCart);

module.exports = router;