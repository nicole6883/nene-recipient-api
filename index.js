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

    const recipient_id = response.data.data.id;
    res.json({ recipient_id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipient_id', detail: error.response?.data || error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
