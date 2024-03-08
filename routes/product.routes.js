const Router = require("express");
const router = new Router();
const userController = require('../controller/product.controller');

router.post('/shop', userController.createProduct);
router.get('/shop', userController.getProducts);
router.get('/shop/:id', userController.getOneProduct);

module.exports = router;