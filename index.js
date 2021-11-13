const { MongoClient } = require('mongodb');
const express = require('express')
const cors = require('cors')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// connection in database 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a9icx.mongodb.net/zulzanacoffie?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// Use ALL Apis

async function run() {
    try {

      await client.connect();
      const database = client.db("zulzanacoffie");
    //   all collections
      const testimonials = database.collection("testimonials");
      const orders = database.collection("orders");
      const users = database.collection("users");
      const products = database.collection("products");
     

    //   All Get Datas
    //   get testimonial Data 
    app.get('/testimonial', async( req, res) =>{
        const result =   await testimonials.find({}).toArray()
        res.json(result)
    });
    // All Products Fetch
    app.get('/products', async( req, res) =>{
        const result =   await products.find({}).toArray()
        res.json(result)
    });

    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/', (req, res) =>{
    res.send("Server Running")
});

app.listen(port, ()=>{
    console.log("server Running ", port )
});