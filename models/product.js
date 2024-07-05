const { randomUUID } = require("crypto");
const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(p,
    (err, data) => {
      if (err) {
        console.log(err);
        cb([]);
      } else {
        cb(JSON.parse(data));
      }
    }
  );
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = randomUUID().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
