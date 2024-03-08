const { render } = require('ejs');
const path = require('path');


class AboutController {
  async showAbout(req, res) {
    res.render(path.join(__dirname, '../templates/about'));
  }
}

module.exports = new AboutController();