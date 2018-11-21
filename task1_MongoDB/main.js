const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";
const objectId = require("mongodb").ObjectID;

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//create
// MongoClient.connect(url, function (err, db) {
//     if (err) {
//         throw err;
//     }
//     const mydb = db.db('mydb');
//     mydb.createCollection('products', function (err, res) {
//         if (err) throw err;
//         console.log('Collection created'); 
//     });
// });

// get all
app.get("/products", function (req, res) {

    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }
        const mydb = db.db('mydb');
        mydb.collection('products').find({}).toArray(function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);
            res.send(result);
            db.close();
        });
    });
});

// get by id
app.get("/products/:id", function (req, res) {

    const id = new objectId(req.params.id);

    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }
        const mydb = db.db('mydb');
        mydb.collection('products').findOne({ _id: id }, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);
            res.send(result);
            db.close();
        });
    });
});

// add
app.post('/products', function (req, res) {
    const prod1 = {
        name: req.body.name,
        units: req.body.units,
        quantity: req.body.quantity,
        price: req.body.price
    };

    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }
        const mydb = db.db('mydb');
        mydb.collection('products').insertOne(prod1, function (err, data) {
            console.log(data);
            res.send(prod1);
            db.close();
        });
    });
});    

//Update
app.put('/products', function (req, res) {

    const id = new objectId(req.body.id);
    const prName = req.body.name;
    const prUnits = req.body.units;
    const prQuantity = req.body.quantity;
    const prPrice = req.body.price;
   

    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }
        const mydb = db.db('mydb');
        const newValues = { 
            $set: {
                name: prName,
                units: prUnits,
                quantity: prQuantity,
                price: prPrice
            }
        };
        mydb.collection('products').findOneAndUpdate({ _id: id }, newValues, 
            { returnOriginal: false }, function (err, result) {
            if (err) {
                throw err;
            }
            console.log('1 document updated');
            const product = result.value
            res.send(product);
            db.close();
        });
    });
});

// Delete
app.delete("/products/:id", function (req, res) {
    const id = new objectId(req.params.id);

    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }
        const mydb = db.db('mydb');
        mydb.collection('products').findOneAndDelete({ _id: id }, function (err, obj) {
            if (err) {
                throw err;
            }
            console.log('1 document deleted');
            const product = obj.value;
            res.send(product);
            db.close();
        });
    });
});

http.listen(port, () => {
    console.log(`listening on ${port}`);
});