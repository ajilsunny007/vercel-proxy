module.exports = async (req, res) => {
  // Dynamically set CORS headers for serverless
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
  // Only allow credentials if not using wildcard origin
  if (origin !== '*') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const apiUrl = 'https://cubet.keka.com/k/attendance/api/mytime/attendance/summary';
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': req.headers['authorization'],
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
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error', details: error.message });
  }
};
