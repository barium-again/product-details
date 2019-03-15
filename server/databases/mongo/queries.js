const redis = require('redis');
// const redisURL = 'localhost';
const redisURL = '54.80.195.86';
const RedisClient = redis.createClient(6379, redisURL);
const { findProductByIdCached } = require('./cache.js');

const MongoClient = require('mongodb').MongoClient;
const url = require('./auth.js').URL; // remote db
// const url = 'mongodb://localhost'; // local
// const url = 'mongodb://mongo/sephora'; // for docker
let db;


MongoClient
  .connect(url, (err, database) => {
    if (err) {
      console.log('connection to mongo unsuccessful');
      //setTimeout(connectToMongo, 1000);
    } else {
      console.log('connection to mongo successful');
      db = database.db('sephora').collection('products');
    }
  });

//connectToMongo();
//
module.exports = {
  getProductById: (req, res) => {
    findProductByIdCached(db, RedisClient, Number(req.params.id), (err, product) => {
      if (product) {
        res.status(200).send(product);
      } else {
        res.status(404).end();
      }
    })
  },
  addProduct: (req, res) => {
    let product = req.body;
  },
  updateProduct: (req, res) => {

  },
  deleteProduct: (req, res) => {
    
  }
}


/*
 *  const addProduct = (req, res) => {
 *    let product = req.body;
 *  }
 *  const updateProduct = (req, res) => {
 *
 *  }
 *  const deleteProduct = (req, res) => {
 *    
 *  }
 */
