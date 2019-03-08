// not using ORM mongoose anymore, look at queries.js for db connection

const mongoose = require('mongoose');

const connectToMongo = () => {
  mongoose
  //.connect('mongodb://mongo/sephora')
    .connect('mongodb://localhost/sephora')
    .then(() => console.log('connection to mongo successful'))
    .catch(() => {
      console.log('connection to mongo unsuccessful');
      setTimeout(connectToMongo, 1000);
      // process.exit();
    });
};

connectToMongo();

const productSchema = new mongoose.Schema({
  name: String,
  id: Number,
  description: String,
  breadcrumbs: [String],
  size: String,
  item_number: String,
  price: String,
  details: String,
  how_to_use: String,
  ingredients: String,
  about_the_brand: String,
  shipping_returns: String,
  exclusive: Boolean,
  average_rating: Number,
  review_count: Number,
  loves_count: Number,
  media: [String]
});

const Product = mongoose.model('product', productSchema);

Product.find().then(data => {

  /*
   *mongoose.connection.collections['products'].drop( function(err) {
   *  console.log('collection dropped');
   *});
   */
  require('./dataGenerator');

});
module.exports = { Product, mongoose, connectToMongo };
