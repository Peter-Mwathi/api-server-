import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import product from "./models/product.js";
import category from "./models/category.js";

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

//DB CONFIG
const connect_url =
  "mongodb+srv://admin:XLgdUZwBlkInTAIW@cluster0.vshpb.mongodb.net/productsapi?retryWrites=true&w=majority";

//connect through mongo
mongoose.connect(connect_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//ENDPOINTS

//ENDPOINT 1: get all products when the user does not choose any endpoint
app.get("/", async (req, res) => {
  res.json({
    reponse:
      "Thank your for using our product API. Check our valid endpoints and them it in your project. :)",
  });
});

//ENDPOINT 2: get all categories when the user wishes to get all categories --> nothing much on categories
app.get("/categories", async (req, res) => {
  try {
    const allCategories = await category.find();
    res.json(allCategories);
  } catch (err) {
    res.json({
      message: "A server error occured while fetching categories.",
    });
  }
});

//ENDPOINT 3: get all products when the user ads /products endpoint
app.get("/products", async (req, res) => {
  try {
    const allproducts = await product.find();
    res.json(allproducts);
  } catch (err) {
    res.json({
      message: "A server error occured while fetching all products",
    });
  }
});

// ENDPOINT 4: Get specific item with specific Id when the user wants to get it
app.get("/products/:productId", async (req, res) => {
  try {
    const singleProduct = await product.findById(req.params.productId);
    res.json(singleProduct);
  } catch (err) {
    res.json({
      message: "An error occured or the product with that id does not exist.",
    });
  }
});

// ENDPOINT 4: a group of items
app.get("/products/search/:searchKey", async (req, res) => {
  try {
    const searchResults = await product.find({
      title: {
        $regex: `.*${req.params.searchKey}.`,
        $options: "i",
      },
    });
    if (searchResults.length > 0) {
      res.json(searchResults);
    } else {
      res.json({
        response:
          "We could not match any item with your search term. Try another keyword",
      });
    }
  } catch {
    res.json({
      response:
        "Server error or we could not match any item with your search term. Try another keyword",
    });
  }
});

// ENDPOINT 5: limit number of result
app.get("/products/count/:count", async (req, res) => {
  const countValue = parseInt(req.params.count);
  if (parseInt(req.params.count)) {
    try {
      const countproducts = await product.find().limit(countValue);
      res.json(countproducts);
    } catch (err) {
      res.json({
        response:
          "A server error occured while fetching products. Make sure your are connected to a network or come back later :). Also, make sure the count value is a number.",
      });
    }
  } else {
    res.json({
      response:
        "A server error occured while fetching products. Make sure your are connected to a network or come back later :). Also, make sure the count value is a number.",
    });
  }
});

//App listen on port
app.listen(app.get("port"), () => {
  console.log(`Example app listening at http://localhost:${app.get("port")}`);
});
