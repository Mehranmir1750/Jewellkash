require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const pool = require("./db/db");

const app = express();


// MIDDLEWARE
app.use(cors());
app.use(express.json());


// HOME ROUTE
app.get("/", (req, res) => {
  res.send("API Running");
});


// REGISTER API
app.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // INSERT USER INTO DATABASE
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    res.json(newUser.rows[0]);

  } catch (error) {

    console.log(error.message);

    res.status(500).json({
      error: "Server Error"
    });

  }

});







const jwt = require("jsonwebtoken");


// LOGIN API
app.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // CHECK USER
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    // USER NOT FOUND
    if (user.rows.length === 0) {

      return res.status(401).json({
        message: "Invalid Email"
      });

    }

    // FOUND USER
    const validUser = user.rows[0];

    // CHECK PASSWORD
    const validPassword = await bcrypt.compare(
      password,
      validUser.password
    );

    // WRONG PASSWORD
    if (!validPassword) {

      return res.status(401).json({
        message: "Invalid Password"
      });

    }

    // CREATE TOKEN
    const token = jwt.sign(
      {
        id: validUser.id,
        email: validUser.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    // SUCCESS RESPONSE
    res.json({
      message: "Login Successful",
      token,
      user: {
        id: validUser.id,
        name: validUser.name,
        email: validUser.email,
        role: validUser.role
      }
    });

  } catch (error) {

    console.log(error.message);

    res.status(500).json({
      message: "Server Error"
    });

  }

});
























app.post("/add-product", async (req, res) => {

  try {

    const {
      name,
      price,
      stock,
      category,
      image,
      description,
    } = req.body;

    const newProduct = await pool.query(
      `INSERT INTO products
      (name, price, stock, category, image, description)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        name,
        price,
        stock,
        category,
        image,
        description,
      ]
    );

    res.json(newProduct.rows[0]);

  } catch (err) {
    console.error(err.message);
  }
});




app.get("/products", async (req, res) => {

  try {

    const allProducts =
      await pool.query(
        "SELECT * FROM products ORDER BY id DESC"
      );

    res.json(allProducts.rows);

  } catch (err) {

    console.error(err.message);

  }
});







app.delete("/products/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM products WHERE id = $1",
      [id]
    );

    res.json("Product Deleted");

  } catch (err) {

    console.error(err.message);

  }
});





app.get("/orders", async (req, res) => {

  try {

    const allOrders =
      await pool.query(
        "SELECT * FROM orders ORDER BY id DESC"
      );

    res.json(allOrders.rows);

  } catch (err) {

    console.error(err.message);

  }
});





// SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});