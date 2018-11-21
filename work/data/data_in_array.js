const products = [];

module.exports.insert = product => {
    products.push(product);
    return products;
};
module.exports.findOne = index => products[index];
module.exports.find = () => products;
module.exports.update = (index, value) => products[index] = value;
module.exports.delete = index => product.splice(index, 1, {});

module.exports.size = products.length;