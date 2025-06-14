import express from "express";
import { nanoid } from "nanoid";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./src/config/postgre.config.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create short URL
app.post("/create", async (req, res) => {
  const { fullUrl } = req.body;
  const shortUrl = nanoid(7); // shorter ID

  try {
    const result = await pool.query(
      "INSERT INTO short_urls (full_url, short_url) VALUES ($1, $2) RETURNING *",
      [fullUrl, shortUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating short URL:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Redirect short URL
app.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT full_url FROM short_urls WHERE short_url = $1",
      [id]
    );

    if (result.rows.length > 0) {
      res.redirect(result.rows[0].full_url);
    } else {
      res.status(404).send("Not found");
    }
  } catch (err) {
    console.error("Error redirecting:", err);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
