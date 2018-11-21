const app = require('express')();
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http').Server(app);
// const DB = require('./data/data_in_array');

const port = 3000;
const DBfile = `${__dirname}/data/data_in_file.txt`;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/products', function(req, res) {
    fs.readFile(DBfile, function(err, data) {
        res.writeHead(200, {'Content-type': 'text/json'});
        res.write(data);
        res.end();
    })
    // res.send(DB.find());
});

// app.get('/products/:id', function(req, res) {
// //    res.send(DB.findOne(+req.params.id -1)); 
// });

app.post('/products', function(req, res) {
    const product = {
        id: Date.now(),
        name: req.body.name,
        units: req.body.units,
        quantity: req.body.quantity,
        price: req.body.price
    };
    fs.appendFile(DBfile, JSON.stringify(product), function(err) {
        try {
            if (err) {
                throw err;
            }
            console.log('saved');
        } catch (e) {
            console.log(e);
        }
    });
    res.send();
    // res.send(DB.insert(product));
});

http.listen(port, function() {
    console.log(`Started listening on port ${port}`);
});