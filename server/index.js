const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const parser = require('body-parser');
const path = require('path');


const PORT = process.env.PORT || 3002;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../public')));

// mongo
const { getProductById, addProduct, updateProduct, deleteProduct, db } = require('./databases/mongo/queries.js');
// postgres
// const { getProductById, addProduct, updateProduct, deleteProduct } = require('./databases/postgres/queries.js');
app.get('/productDetails/:id', getProductById);
app.post('/productDetails', addProduct);
app.put('/productDetails', updateProduct);
app.delete('/productDetails/:id', deleteProduct);

app.listen(PORT, () => console.log(`server is listening on PORT: ${PORT}`));
