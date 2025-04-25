const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Twitter recipient_id API is running!');
});

app.get('/recipient-id/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const response = await axios.get(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );

    const recipient_id = response.data?.data?.id;

    if (!recipient_id) {
      return res.status(404).json({ error: 'User not found', detail: response.data });
    }

    res.json({ recipient_id });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch recipient_id',
      detail: error.response?.data || error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
