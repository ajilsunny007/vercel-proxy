// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/proxy', async (req, res) => {
  const apiUrl = 'https://cubet.keka.com/k/attendance/api/mytime/attendance/summary';
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': req.headers['authorization'], // Pass through the auth
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  });
  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log('Proxy running on port 3000'));
