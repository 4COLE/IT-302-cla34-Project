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

  static async apiGetCoinById(req, res, next) {
    try {
      const coin = await CoinDAO.getCoinById(req.params.id);
      if (!coin) {
        res.status(404).json({ error: "Coin not found" });
        return;
      }
      res.json(coin);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

class CommentController {
  static async apiPostComment(req, res, next) {
    try {
      const { text, userName, userId } = req.body; 
      const coinId = req.params.id;
      const commentInfo = {
        coinId,
        text,
        userName, 
        userId,
        lastModified: new Date()
      };
      
      const result = await CommentDAO.addComment(commentInfo);
      res.json({ status: "success", result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

module.exports = CoinController;
