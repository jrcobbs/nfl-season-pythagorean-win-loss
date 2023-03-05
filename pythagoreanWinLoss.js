const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const EXPONENT = 2.37;

app.use(bodyParser.json());

function round(value, decimalPlace) {
    const multiplier = Math.pow(10, decimalPlace || 0);
    return Math.round(value * multiplier) / multiplier;
}

app.post('/calculate', (req, res) => {
  const { gamesPlayed, pointsFor, pointsAgainst } = req.body;

  const pythagoreanWins = round(Math.pow(pointsFor, EXPONENT) / (Math.pow(pointsFor, EXPONENT) + Math.pow(pointsAgainst, EXPONENT)) * gamesPlayed, 1);
  const pythagoreanLosses = round(gamesPlayed - pythagoreanWins, 1);

  let pythagoreanRecord = {
    "expected-win-loss-record": `${pythagoreanWins} - ${pythagoreanLosses}`
  }

  res.send(pythagoreanRecord);
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
