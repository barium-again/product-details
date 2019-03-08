const fs = require('file-system');
const cmd = require('node-run-cmd');
const { Readable } = require('stream');
// const { connectToMongo } = require('./index.js');

const faker = require('faker');
const amount = 1e7;
// const { Product, mongoose } = require('./index');
let imageCounter = 0;
faker.seed(42);
count = 0;

const inStream = new Readable({
  read() {
    const randInt = (low, high) => {
      return Math.floor(Math.random() * (high - low) + low);
    };
    if (count === 0) {
      this.push('[\n');
    }
      const newProduct = {};
      newProduct.id = count;
      newProduct.name = faker.commerce.productName();
      newProduct.breadcrumbs = [];
      const breadcrumbCount = randInt(2, 4);
      for (let i = 0; i < breadcrumbCount; i++) {
        let crumb = faker.lorem.word();
        crumb = crumb[0].toUpperCase() + crumb.slice(1);
        newProduct.breadcrumbs.push(crumb);
      }
      newProduct.description = faker.lorem
        .lines(1)
        .split(' ')
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(' ')
        .slice(0, -1);
      newProduct.size = faker.lorem.word();
      newProduct.item_number = randInt(10000000, 99999999);
      newProduct.price = faker.commerce.price();
      newProduct.details = faker.lorem.paragraph();
      newProduct.how_to_use = faker.lorem.paragraphs(2, ' ');
      newProduct.ingredients = faker.lorem.paragraph();
      newProduct.about_the_brand = faker.lorem.paragraph();
      newProduct.shipping_returns = faker.lorem.paragraph();
      newProduct.exclusive = faker.random.boolean();
      newProduct.average_rating = Math.random() * 5;
      newProduct.review_count = randInt(0, 5000);
      newProduct.loves_count = randInt(0, 50000);
      newProduct.media = [];
      let imageCount = randInt(1, 5);
      for (let i = 0; i < imageCount; i++) {
        let url = `https://picsum.photos/1920?image=${imageCounter}`;
        newProduct.media.push(url);
      }
      // const videoCount = randInt(0, 3);
      // for (let i = 0; i < videoCount; i++) {
      //   let mediaObj = {};
      //   mediaObj.type = 'image';
      //   mediaObj.url =
      //     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      //   newProduct.media.push(mediaObj);
      // }
      /*
        *const newProductDoc = new Product(newProduct);
        *newProductDoc.save();
        */
      let objString = JSON.stringify(newProduct);
      if (count < amount - 1) {
        objString = objString + ',';
      }
      this.push(objString + '\n');
      if (count % 100000 === 0) {
        console.log((count / amount * 100) + '%');
      }
    count += 1;
    if (count === amount) {
      this.push(']');
      this.push(null);
      console.log('data generation complete');
    }
  }
});

let file = fs.createWriteStream('./data.json');

/*
 *const outStream = new Writable({
 *  write(chunk, encoding, callback) 
 *})
 */

inStream.pipe(file);


/*
 *connectToMongo();
 *console.log('importing to mongo');
 *cmd.run('mongoimport --host localhost --db sephora --collection products --file ./data.file --jsonArray');
 *
 */
