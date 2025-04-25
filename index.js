const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/get-recipient-id', async (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const response = await axios.get(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );

    console.log("Twitter API response:", response.data); // ← 追加したログ出力

    const recipient_id = response.data?.data?.id;

    if (!recipient_id) {
      return res.status(404).json({ error: "User not found", detail: response.data });
    }

    res.json({ recipient_id });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch recipient_id",
      detail: error.response?.data || error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
