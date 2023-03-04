const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/calculate', (req, res) => {
  const { gamesPlayed, pointsFor, pointsAgainst } = req.body.Season;

  const pythagoreanWins = Math.round(Math.pow(pointsFor, 2.37) / (Math.pow(pointsFor, 2.37) + Math.pow(pointsAgainst, 2.37)) * gamesPlayed);
  const pythagoreanLosses = gamesPlayed - pythagoreanWins;

  res.send(`Expected win-loss record: ${pythagoreanWins} - ${pythagoreanLosses}`);
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
