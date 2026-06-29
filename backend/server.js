require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const pool = require("./db/db");

const app = express();
const auth = require("./middleware/auth")
const admin = require("./middleware/admin");





const multer = require("multer");
const cloudinary = require("./cloudinary");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });


// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(router);

const cartRoutes = require("./routes/cart");

app.use(cartRoutes);


// HOME ROUTE
app.get("/", (req, res) => {
  res.send("API Running");
});


// REGISTER API
app.post("/register", async (req, res) => {

  try {

   const {
  name,
  email,
  phone,
  password
} = req.body;

const joinedDate =
  new Date().toLocaleDateString();

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // INSERT USER INTO DATABASE
    const newUser = await pool.query(
  `INSERT INTO users
  (name, email, password, phone, role, joined_date)

  VALUES ($1, $2, $3, $4, $5, $6)

  RETURNING *`,
  [
  name,
  email,
  hashedPassword,
  phone,
  "user",
  joinedDate
]
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
        email: validUser.email,
         role: validUser.role
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
























app.post("/add-product",auth, admin, async (req, res) => {

  try {

    const {
  name,
  price,
  stock,
  category,
  size,
  image,
  description,
} = req.body;

    const newProduct = await pool.query(
      `INSERT INTO products
(name, price, stock, category, size, image, description)
VALUES ($1, $2, $3, $4, $5, $6, $7)`,
     [
  name,
  price,
  stock,
  category,
  size,
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
        "SELECT * FROM products ORDER BY sort_order ASC"
      );

    res.json(allProducts.rows);

  } catch (err) {

    console.error(err.message);

  }
});



app.patch("/products/reorder",auth,admin, async (req, res) => {
  try {
    const { order } = req.body;
    // order = [{ id: 3, sort_order: 1 }, { id: 7, sort_order: 2 }, ...]

    for (const item of order) {
      await pool.query(
        "UPDATE products SET sort_order = $1 WHERE id = $2",
        [item.sort_order, item.id]
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});







app.delete("/products/:id",auth,admin, async (req, res) => {

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





app.get("/orders",auth,admin, async (req, res) => {

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

app.get("/users",auth,admin, async (req, res) => {

  try {

    const allUsers =
      await pool.query(
        `SELECT * FROM users
WHERE role = 'user'
ORDER BY id DESC;`
      );

    res.json(allUsers.rows);

  } catch (err) {

    console.error(err.message);

  }
});



app.delete("/users/:id",auth,admin, async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM users WHERE id = $1",
      [id]
    );

    res.json("User Deleted");

  } catch (err) {

    console.error(err.message);

  }
});



app.get("/admin-dashboard",auth,admin, async (req, res) => {

  try {

    // Users
    const users =
      await pool.query(
        "SELECT COUNT(*) FROM users WHERE role = 'user'"
      );

    // Orders
    const orders =
      await pool.query(
        "SELECT COUNT(*) FROM orders"
      );

    // Products
    const products =
      await pool.query(
        "SELECT COUNT(*) FROM products"
      );

    // Revenue
    const revenue =
      await pool.query(
        "SELECT COALESCE(SUM(price), 0) FROM orders"
      );

    // Response
    res.json({

      totalUsers:
        Number(users.rows[0].count),

      totalOrders:
        Number(orders.rows[0].count),

      totalProducts:
        Number(products.rows[0].count),

      totalRevenue:
        Number(revenue.rows[0].coalesce),

    });

  } catch (err) {

    console.error(err.message);

    res.status(500).json({
      error: "Server Error"
    });

  }

});


app.put("/products/:id",auth,admin, async (req, res) => {

  try {

    const { id } = req.params;

    const {
  name,
  price,
  stock,
  category,
  size,
  image,
  description,
} = req.body;

    const updatedProduct =
      await pool.query(

        `UPDATE products

SET
name = $1,
price = $2,
stock = $3,
category = $4,
size = $5,
image = $6,
description = $7

WHERE id = $8

RETURNING *;`,

        [
  name,
  price,
  stock,
  category,
  size,
  image,
  description,
  id,
]
      );

    res.json(updatedProduct.rows[0]);

  } catch (err) {

    console.error(err.message);

  }
});


// app.get("/products/:id", async (req, res) => {

//   try {

//     const { id } = req.params;

//     const product =
//       await pool.query(
//         "SELECT * FROM products WHERE id = $1",
//         [id]
//       );

//     res.json(product.rows[0]);

//   } catch (err) {

//     console.error(err.message);

//   }
// });



app.get("/api/cart/:userId",auth, async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `
      SELECT
        p.id,
        p.name,
        p.price,
        p.image
      FROM cart c
      JOIN products p
      ON c.product_id = p.id
      WHERE c.user_id = $1
      `,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error"
    });
  }
});




app.get("/orders/:userId",auth, async (req, res) => {
  try {

    const { userId } = req.params;

    const result = await pool.query(
      `
      SELECT
        o.id,
        o.price,
        o.status,
        o.date,
        p.name,
        p.image
      FROM orders o
      JOIN products p
      ON o.product_id = p.id
      WHERE o.user_id = $1
      ORDER BY o.id DESC
      `,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Server Error"
    });

  }
});





app.post("/checkout/:userId",auth, async (req, res) => {
  try {

    const { userId } = req.params;

    const {
      name,
      phone,
      address,
      location,
      deliveryCharge,
      total,
    } = req.body;

    const cartItems = await pool.query(
      `
      SELECT
        c.product_id,
        p.name,
        p.price
      FROM cart c
      JOIN products p
      ON c.product_id = p.id
      WHERE c.user_id = $1
      `,
      [userId]
    );

    let firstOrderId = null;

    for (const item of cartItems.rows) {

      const order = await pool.query(
        `
        INSERT INTO orders
        (
          customer_name,
          product_name,
          price,
          status,
          date,
          user_id,
          product_id
        )
        VALUES
        ($1,$2,$3,$4,NOW(),$5,$6)
        RETURNING id
        `,
        [
          name,
          item.name,
          item.price,
          "Processing",
          userId,
          item.product_id,
        ]
      );

      if (!firstOrderId) {
        firstOrderId = order.rows[0].id;
      }
    }

    await pool.query(
      `
      INSERT INTO order_details
      (
        order_id,
        user_id,
        customer_name,
        phone,
        address,
        location,
        delivery_charge,
        total_amount,
        payment_status
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      `,
      [
        firstOrderId,
        userId,
        name,
        phone,
        address,
        location,
        deliveryCharge,
        total,
        "Pending",
      ]
    );

    await pool.query(
      `
      DELETE FROM cart
      WHERE user_id = $1
      `,
      [userId]
    );

    res.json({
      success: true,
      message: "Order placed successfully",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Server Error",
    });

  }
});



app.put("/orders/:id",auth,admin, async (req, res) => {
  try {

    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await pool.query(
      `
      UPDATE orders
      SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, id]
    );

    res.json(updatedOrder.rows[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Server Error"
    });

  }
});


router.post(
  "/upload",
  auth,
  admin,
  upload.single("image"),
  async (req, res) => {
    try {

      const b64 =
        Buffer.from(req.file.buffer).toString(
          "base64"
        );

      const dataURI =
        "data:" +
        req.file.mimetype +
        ";base64," +
        b64;

      const result =
        await cloudinary.uploader.upload(
          dataURI,
          {
            folder: "jewellkash",
          }
        );

      res.json({
        url: result.secure_url,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: "Upload failed",
      });

    }
  }
);


app.get("/order-details",auth,admin, async (req, res) => {
  try {

    const result = await pool.query(
      `
      SELECT *
      FROM order_details
      ORDER BY id DESC
      `
    );

    res.json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Server Error",
    });

  }
});




// app.post("/google-login", async (req, res) => {
//   try {

//     const { name, email } = req.body;

//     console.log("Google request:", req.body);

//     let user = await pool.query(
//       `
//       SELECT *
//       FROM users
//       WHERE email = $1
//       `,
//       [email]
//     );

//     console.log("User exists:", user.rows.length);

//     if (user.rows.length === 0) {

//       user = await pool.query(
//         `
//         INSERT INTO users
//         (
//           name,
//           email,
//           role,
//           joined_date
//         )
//         VALUES
//         ($1,$2,$3,$4)
//         RETURNING *
//         `,
//         [
//           name,
//           email,
//           "user",
//           new Date().toLocaleDateString(),
//         ]
//       );
//       console.log("Inserting new Google user...");
//     }

//     res.json(user.rows[0]);

//   } catch (err) {

//     console.error(err);

//     res.status(500).json({
//       error: "Server Error",
//     });

//   }
// });

app.post("/google-login", async (req, res) => {
  try {
    const { name, email } = req.body;

    let result = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    let user;

    if (result.rows.length === 0) {
      // New user — insert them
      const inserted = await pool.query(
        `INSERT INTO users (name, email, role, joined_date)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, email, "user", new Date().toLocaleDateString()]
      );
      user = inserted.rows[0];
    } else {
      user = result.rows[0];
    }

    // Generate token — same as regular login
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (product.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});



// SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});