const { render } = require('ejs');
const db = require('../db');
const path = require('path');

class ProductController {

  async createProduct(req, res) {
    const {pname, pcompany, ptype, pprice} = req.body;
    const newProduct = await db.query(`INSERT INTO product(p_name, p_company, p_type, p_price) values ($1, $2, $3, $4) RETURNING *`, [pname, pcompany, ptype, pprice]);
    res.json(newProduct.rows[0]);
  }

  async getProducts(req, res) {
    const products = await db.query('SELECT * FROM product');
    res.render(path.join(__dirname, '../templates/index'), {cards: products.rows});
  }

  async getOneProduct(req, res) {
    const id = req.params.id;
    const product = await db.query('SELECT * FROM product where p_id = $1', [id]);
    res.json(product.rows[0]);
  }

}

module.exports = new ProductController();