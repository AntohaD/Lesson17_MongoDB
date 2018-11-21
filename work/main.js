const MongoClient = require('mongodb');
const url = "mongodb://localhost:27017/mydb";

const prod1 = {
    name: 'cocoa',
    units: 'unit',
    quantity: 10,
    price: 100
};

MongoClient.connect(url, function (err, db) {
    if (err) {
        throw err;
    }
    console.log("Database created!");
    const mydb = db.db('mydb');
    mydb.createCollection('products', function(err, res) {
        if (err) throw err;
        console.log('Collection created');
        mydb.collection('products').insertOne(prod1, function(err, data) {
            // console.log(mydb.collection('products'));
            console.log(data);
            db.close();    
        });    
    });
});