const fs = require('file-system');
const { Readable } = require('stream');

const faker = require('faker');
const limit = 1e7;

let productCount = 0;
let imageCount = 0;

const randInt = (low, high) => {
  return Math.floor(Math.random() * (high - low) + low);
}

const readMedia = new Readable({
  read() {
    if (productCount === 0) {
      let heading = 'product_id,type,url';
      this.push(heading);
    }
    let productId = productCount;
    let type = 'image';
    imageCount = randInt(1, 5);
    productCount += 1;
    for (let i = 0; i < imageCount; i++) {
      let url = `https://picsum.photos/1920?image=${imageCount}`;
      let entry = `\n${productId},${type},${url}`;
      if (i === imageCount - 1 && productCount !== limit) {
        entry = entry + ',';
      }
      this.push(`\n${productId},${type},${url}`);
    }
    if (productCount % 1e5 === 0) {
      console.log(Math.floor(productCount / limit * 100) + '%');
    }

    if (productCount >= limit) {
      this.push(null);
    }
  }
});

let csvFile = fs.createWriteStream('./mediaData.csv');

readMedia.pipe(csvFile);
