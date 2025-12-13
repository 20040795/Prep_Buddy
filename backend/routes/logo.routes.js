import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/:domain", async (req, res) => {
  try {
    const domain = req.params.domain;
    const logoURL = `https://logo.clearbit.com/${domain}`;

    const response = await fetch(logoURL);

    if (!response.ok) {
      return res.status(404).send(null);
    }

    const buffer = await response.buffer();
    res.set("Content-Type", "image/png");
    res.send(buffer);

  } catch (err) {
    console.log("Logo proxy error:", err);
    res.status(500).send(null);
  }
});

export default router;
