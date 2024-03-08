const { render } = require('ejs');
const db = require('../db');
const path = require('path');

class OrderController {

  async showOrder(req, res) {
    res.render(path.join(__dirname, '../templates/order'));
  }

  async getOneOrder(req, res) {
    const id = req.body.data;
    const result = await db.query('SELECT ticket.t_status, product.p_name, orders.o_count FROM ticket, orders, product where ticket.t_id = $1 and ticket.t_id = orders.o_ticket and orders.o_product = product.p_id', [id]);

    if(result.rows.length < 1) res.json("Order is not exist!");
    else{
      let status;
      if(result.rows[0].t_status == 0) status = 'In work';
      else status = 'Done';
      let dataSend = '';
      
      result.rows.forEach(item => {
        dataSend += `<p>Status: ${status}, Product Name: ${item.p_name}, Order Count: ${item.o_count}</p>`;
      });
      res.json(dataSend);
    }

  }
}

module.exports = new OrderController();