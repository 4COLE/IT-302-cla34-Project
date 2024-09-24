// Cole Abney 9/24/2024 IT 302-451 Phase 2 cla34@njit.edu

const CoinDAO = require('../dao/CoinDAO');

class CoinController {
  static async apiGetCoins(req, res, next) {
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const filter = req.query.filter || '';

    try {
      const coins = await CoinDAO.getCoins({
        filter,
        pageNumber,
        itemsPerPage,
      });
      res.json(coins);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CoinController;
