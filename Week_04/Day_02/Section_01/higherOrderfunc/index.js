const word = "racecar";

("Split");

function pali(word) {
  console.log(word.split("").reverse().join("") === word);
}

pali("racecar");
