const { render } = require('ejs');
const db = require('../db');
const path = require('path');


class CartController {

  async createOrder(req, res) {
    const {tuname, tusurname, tumail, tuphone, tuadress, order} = req.body.data;
    let status = 0;
    const newTicket = await db.query(`INSERT INTO ticket(t_status, tu_name, tu_surname, tu_mail, tu_phone, tu_adress) values ($1, $2, $3, $4, $5, $6) RETURNING t_id`, [status, tuname, tusurname, tumail, tuphone, tuadress]);
    console.log(newTicket.rows[0].t_id);
    for(let key in order) {
      if (order.hasOwnProperty(key)) {
        const productId = key;
        const quantity = order[key];
        let newOrder = await db.query(`INSERT INTO orders(o_count, o_product, o_ticket) values ($1, $2, $3)`, [productId, quantity, newTicket.rows[0].t_id]);
      }
    }
    res.json("ok");
  }

  async loadCart(req, res) {
    res.render(path.join(__dirname, '../templates/cart'), { combinedResults: [] });
  }

  async getCart(req, res) {
    let data = req.body.data;
    data = JSON.parse(data);
    let products = [];
    for (const productId of data) {
      const result = await db.query('SELECT * FROM product WHERE p_id = $1', [productId]);
      products.push(result.rows[0]);
    }
    const combinedResults = products.flat();
    let page = ``;
    combinedResults.forEach(e => {
      page += `
      <div data-id="${e.p_id}" class="cart__order-card order-card">
              <img src="./images/product1.jpg" alt="product name" class="cart-order__img">
              <div class="order-card__info">
                <h3 class="order-card__title">${e.p_name}</h3>
                <p class="order-card__price">Price: ${e.p_price}$</p>
                <div class="order-card__count order-count">
                  <input name="countProduct" class="order-count__num order-count__num--${e.p_id}" value="1" readonly>
                  <button data-id="${e.p_id}" class="order-count__add" type="button">+</button>
                  <button data-id="${e.p_id}" class="order-count__remove" type="button">-</button>
                </div>
              </div>
              <button data-id="${e.p_id}" class="order-card__close-btn" type="button">X</button>
            </div>
      `
    });
    res.json({ page });
  }

}

module.exports = new CartController();