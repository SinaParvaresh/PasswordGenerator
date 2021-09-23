const fs = require("fs");
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const app = express();
const JSONparser = bodyparser.json();

app.get("/pw-generation", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/pw", JSONparser, (req, res) => {
  const pass_len = req.body.pass_len;
  const includeSymbol = req.body.includeSymbol;
  const includeNumbers = req.body.includeNumbers;
  const includeLowercase = req.body.includeLowercase;
  const includeUppercase = req.body.includeUppercase;
  const requireCharacters = [];

  if (includeSymbol) {
    requireCharacters.push("Symbol");
  }
  if (includeNumbers) {
    requireCharacters.push("Numbers");
  }
  if (includeLowercase) {
    requireCharacters.push("Lowercase");
  }
  if (includeUppercase) {
    requireCharacters.push("Uppercase");
  }

  let new_pass = [];
  let combinedPass = [];

  const genASCIIRange = (lower, upper) => {
    let range = [];
    for (let i = lower; i < upper; i++) {
      range.push(String.fromCharCode(i));
    }
    return range;
  };

  let symbolGroups = {
    Symbol: genASCIIRange(33, 48),
    Lowercase: genASCIIRange(97, 123),
    Uppercase: genASCIIRange(65, 91),
    Numbers: genASCIIRange(48, 58),
  };

  for (let i = 0; i < requireCharacters.length; i++) {
    new_pass.push(
      symbolGroups[requireCharacters[i]][
        getRandomPos(symbolGroups[requireCharacters[i]])
      ]
    );
    combinedPass = combinedPass.concat(symbolGroups[requireCharacters[i]]);
  }

  combinedPass = shuffle(combinedPass);

  for (let i = 0; i < pass_len - requireCharacters.length; i++) {
    new_pass.push(combinedPass[i]);
  }

  new_pass = shuffle(new_pass);
  res.json(new_pass.join(""));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
  app.use(express.static(path.join(__dirname, "/public")));
});

//get random position in array
function getRandomPos(arr) {
  return Math.floor(Math.random() * arr.length);
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  //taken from stackoverflow
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
