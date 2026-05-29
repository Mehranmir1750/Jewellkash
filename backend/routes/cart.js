const express = require("express");
const router = express.Router();
const pool = require("../db/db");

// Add / Remove Cart
router.post("/cart", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const existing = await pool.query(
      `
      SELECT *
      FROM cart
      WHERE user_id = $1
      AND product_id = $2
      `,
      [userId, productId]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        `
        DELETE FROM cart
        WHERE user_id = $1
        AND product_id = $2
        `,
        [userId, productId]
      );

      return res.json({
        added: false,
        message: "Removed from cart",
      });
    }

    await pool.query(
      `
      INSERT INTO cart(user_id, product_id)
      VALUES($1,$2)
      `,
      [userId, productId]
    );

    res.json({
      added: true,
      message: "Added to cart",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

// Get Cart
router.get("/cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `
      SELECT p.*
      FROM cart c
      JOIN products p
      ON c.product_id = p.id
      WHERE c.user_id = $1
      `,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Server Error",
    });
  }
});





// router.delete("/cart/:userId/:productId", async (req, res) => {
//   try {
//     const { userId, productId } = req.params;

//     await pool.query(
//       `
//       DELETE FROM cart
//       WHERE user_id = $1
//       AND product_id = $2
//       `,
//       [userId, productId]
//     );

//     res.json({
//       success: true,
//     });

//   } catch (err) {
//     console.error(err);

//     res.status(500).json({
//       error: "Server Error",
//     });
//   }
// });

// // Remove Item From Cart
// router.delete("/cart/:userId/:productId", async (req, res) => {
//   try {

//     const { userId, productId } = req.params;

//     await pool.query(
//       `
//       DELETE FROM cart
//       WHERE user_id = $1
//       AND product_id = $2
//       `,
//       [userId, productId]
//     );

//     res.json({
//       success: true,
//       message: "Item removed from cart"
//     });

//   } catch (err) {

//     console.error(err);

//     res.status(500).json({
//       error: "Server Error"
//     });

//   }
// });



router.delete("/cart/:userId/:productId", async (req, res) => {
  try {

    const { userId, productId } = req.params;

    console.log("Deleting:", userId, productId);

    const result = await pool.query(
      `
      DELETE FROM cart
      WHERE user_id = $1
      AND product_id = $2
      RETURNING *
      `,
      [userId, productId]
    );

    console.log("Deleted rows:", result.rows);

    res.json({
      success: true,
      deleted: result.rows
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Server Error"
    });

  }
});

module.exports = router;