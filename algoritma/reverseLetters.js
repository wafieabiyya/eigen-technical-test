function reverseLetter(stringInput) {
  var result = "";

  for (var i = stringInput.length - 1; i >= 0; i--) {
    if (stringInput[i].match(/[a-zA-Z]/)) {
      result += stringInput[i];
    }
  }
  return result;
}
console.log(reverseLetter("NEGIE1"));
