const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors'); 

app.use(express.json());
app.use(cors());


app.get('/api/search', (req, res) => {
  const { symbol, period } = req.query;

  
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    try {
      const dbData = JSON.parse(data);
      const companyData = dbData.find((entry) => entry.symbol === symbol && entry.period === period);

      if (companyData) {
        res.json(companyData.data);
      } else {
        res.status(404).json({ error: 'Data not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
