// Cole Abney 9/24/2024 IT 302-451 Phase 2 cla34@njit.edu

let coins;

class CoinDAO {
  static async injectDB(conn) {
    if (coins) return;
    try {
      coins = await conn.db(process.env.DB_NAME).collection(process.env.COLLECTION_NAME);
    } catch (err) {
      console.error(`Unable to establish a collection handle in CoinDAO: ${err}`);
    }
  }

  static async getCoins({ filter = '', pageNumber = 0, itemsPerPage = 10 }) {
    const query = filter ? { name: { $regex: filter, $options: 'i' } } : {};
    let cursor;

    try {
      cursor = await coins.find(query).skip(pageNumber * itemsPerPage).limit(itemsPerPage);
      const coinList = await cursor.toArray();
      return coinList;
    } catch (err) {
      console.error(`Unable to execute find command, ${err}`);
      return { error: err };
    }
  }
}

module.exports = CoinDAO;
