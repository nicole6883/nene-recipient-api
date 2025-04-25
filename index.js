const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

app.get('/', (req, res) => {
  res.send('Twitter recipient_id API is running!');
});

app.get('/recipient-id/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axios.get(`https://api.twitter.com/2/users/by/username/${username}`, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });

    const recipient_id = response.data.data.id;

    res.json({
      username,
      recipient_id,
      dm_link: `https://twitter.com/messages/compose?recipient_id=${recipient_id}`,
    });
  } catch (error) {
    console.error('Error fetching recipient_id:', error.message);
    res.status(500).json({
      error: 'Failed to fetch recipient_id',
      detail: error.response?.data || error.message,
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
