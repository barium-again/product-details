const Pool = require('pg').Pool;
const pool = new Pool({
  host: 'localhost',
  database: 'sephora',
  port: 5432
});

module.exports = {
  getProductById: (req, res) => {
    let id = req.params.id;
    pool.query('SELECT * FROM products WHERE id = $1', [id], (err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(results.rows[0]);
      }
    });
  },
  addProduct: (req, res) => {
    let product = req.body;
  },
  updateProduct: (req, res) => {

  },
  deleteProduct: (req, res) => {
    
  }
};
