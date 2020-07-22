const express = require("express");
const mongoose = require('mongoose');
const userRoute = require('./routes/users');
const app = express();
const port = process.env.PORT || 50011


const Schema = new mongoose.Schema({
    picture: String,
    brand: String,
    type: String,
    price: Number,
    qut: Number,
    description: String,
    count: Number
    },
    {
        collection: 'products'
    });
  
  const Products = mongoose.model('Products', Schema);

app.use(express.json());

app.get('/api/products', async (req, res) => {
      const productData = await Products.find();
  res.send(productData)
});

app.use('/api/users', userRoute);

app.get("/api/products/:id", async (req, res) => {
  const productData = await Products.findById(req.params.id);
  res.send(productData)

})

app.post('/submission', (req, res) => {
 var myData = new Products(req.body);
 myData.save()
   .then(item => {
     res.send("item saved to database");
   })
   .catch(err => {
     res.status(400).send("unable to save to database");
   });
});

const uri = process.env.MONGODB_URL;
mongoose.connect('mongodb+srv://tlXx04pN5TdI:tlXx04pN5TdI@cluster0.ulvxj.mongodb.net/ecommerce?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log('mongodb connection established successfully');
    
}).catch(error => {console.log(error)});

app.listen(port, ()=> {console.log(`server start running on port:  ${port}`)})