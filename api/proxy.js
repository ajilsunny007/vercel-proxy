const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/proxy', async (req, res) => {
  const apiUrl = 'https://cubet.keka.com/k/attendance/api/mytime/attendance/summary';
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': req.headers['authorization'], // Pass auth from frontend
        'Content-Type': 'application/json; charset=utf-8',
      }
    });

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (jsonError) {
      return res.status(502).json({ error: 'Invalid JSON from upstream', details: jsonError.message, raw: text });
    }
    res.json(text);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error', details: error.message });
  }
});

// app.listen(3001, () => {
//   console.log('Proxy server running on http://localhost:3001');
// });
