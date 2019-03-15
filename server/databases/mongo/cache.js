module.exports = {
  findProductByIdCached: (db, redis, id, callback) => {
    redis.get(id, (err, reply) => {
      if (err) {
        callback(err, null);
      } else if (reply) {
        callback(null, JSON.parse(reply));
      } else {
        db.findOne({id: id}, (err, product) => {
          if (product) {
            redis.set(id, JSON.stringify(product), () => {
              callback(null, product);
            });
          }
        });
      }
    });
  }
};
