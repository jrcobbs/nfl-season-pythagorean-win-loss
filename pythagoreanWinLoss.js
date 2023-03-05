const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const EXPONENT = 2.37;

app.use(bodyParser.json());

//TODO: refactor to requestUtils module
function roundToDecimalPlace(value, decimalPlace) {
    const multiplier = Math.pow(10, decimalPlace || 0);
    return Math.round(value * multiplier) / multiplier;
}

function validateRequest (request, response) {
    let errors = []
    for (const key in request) {
        if (!Number.isInteger(request[key])) {
            const error = {
                "errorMessage": `Attribute '${key}' must be an integer.`
            }
            errors.push(error);
        }
    }
    if (errors.length > 0) {
        response.status(400);
        response.send(errors);
    }
}

app.post('/calculate', (req, res) => {
  const body = req.body;

  validateRequest(body, res);

  const { gamesPlayed, pointsFor, pointsAgainst } = body;
  const pythagoreanWins = roundToDecimalPlace(Math.pow(pointsFor, EXPONENT) / (Math.pow(pointsFor, EXPONENT) + Math.pow(pointsAgainst, EXPONENT)) * gamesPlayed, 1);
  const pythagoreanLosses = roundToDecimalPlace(gamesPlayed - pythagoreanWins, 1);

  let pythagoreanRecord = {
    "expected-win-loss-record": `${pythagoreanWins} - ${pythagoreanLosses}`
  }

  res.send(pythagoreanRecord);
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
