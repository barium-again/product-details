const fs = require('file-system');
const { Readable } = require('stream');

const faker = require('faker');
const limit = 1e7;

let productCount = 0;

const randInt = (low, high) => {
  return Math.floor(Math.random() * (high - low) + low);
};

const readProduct = new Readable ({
  read() {
    if (productCount === 0) {
      let heading = 'id,name,description,breadcrumbs,size,item_number,price,details,how_to_use,ingredients,about_the_brand,shipping_returns,exclusive,average_rating,review_count,loves_count,media';
      this.push(heading);
    }
    let id = productCount;
    let name = faker.commerce.productName();
    let description = faker.lorem
      .lines(1)
      .split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ')
      .slice(0, -1);

    let breadcrumbs = '';
    let breadcrumbCount = randInt(2, 4);
    for (let i = 0; i < breadcrumbCount; i++) {
      let crumb = faker.lorem.word();
      crumb = crumb[0].toUpperCase() + crumb.slice(1);
      if (i < breadcrumbCount - 1) {
        crumb = crumb + ',';
      }
      breadcrumbs = breadcrumbs + crumb;
    }

    let size = faker.lorem.word();
    let item_number = randInt(10000000, 99999999);
    let price = faker.commerce.price();
    let details = faker.lorem.paragraphs(1, ' ');
    let how_to_use = faker.lorem.paragraphs(2, ' ');
    let ingredients = faker.lorem.paragraph(1);
    let about_the_brand = faker.lorem.paragraph();
    let shipping_returns = faker.lorem.paragraph();
    let exclusive = faker.random.boolean();
    let average_rating = Math.random() * 5;
    let review_count = randInt(0, 5000);
    let loves_count = randInt(0, 50000);

    let imageCount = randInt(1, 5);
    let media = '';
    for (let i = 0; i < imageCount; i++) {
      let url = `http://picsum.photos/1920?image=${imageCount}`;
      if (i < imageCount - 1) {
        url = url + ',';
      }
      media = media + url;
    }

    let entry = `\n${id},${name},"${description}","{${breadcrumbs}}",${size},${item_number},${price},"${details}","${how_to_use}","${ingredients}","${about_the_brand}","${shipping_returns}",${exclusive},${average_rating},${review_count},${loves_count},"{${media}}"`;
    this.push(entry);
    productCount += 1;
    if (productCount % 100000 === 0) {
      console.log(Math.floor(productCount / limit * 100) + '%');
    }
    if (productCount >= limit) {
      this.push(null);
      console.log('product details data generation complete');
    }
  }
})

let csvFile = fs.createWriteStream('./data.csv');

readProduct.pipe(csvFile);
