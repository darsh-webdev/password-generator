/* <-------------------------------Generator Functions-----------------------------> */
//Random Lower Case Letter Generator
const getRandomLower = () => {
  const randomCharCode = Math.floor(Math.random() * 26) + 97;
  return String.fromCharCode(randomCharCode);
};

//Random Upper Case Letter Generator
const getRandomUpper = () => {
  const randomCharCode = Math.floor(Math.random() * 26) + 65;
  return String.fromCharCode(randomCharCode);
};

//Random Number Generator
const getRandomNumber = () => {
  return Math.floor(Math.random() * (9 - 0) + 0);
};

//Random Symbol Generator
const getRandomSymbol = () => {
  const symbols = "!@#$%^&*";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

//Object with all generator Functions

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

/* <-------------------------------DOM Elements-------------------------------------> */
const resultEle = document.getElementById("result");
const lengthEle = document.getElementById("length");
const uppercaseEle = document.getElementById("uppercase");
const lowercaseEle = document.getElementById("lowercase");
const numbersEle = document.getElementById("numbers");
const symbolsEle = document.getElementById("symbols");
const generateEle = document.getElementById("generate");
const clipboardEle = document.getElementById("clipboard");

//Handle click when clicked on Generate Button
generateEle.addEventListener("click", () => {
  const length = +lengthEle.value;
  const hasLower = lowercaseEle.checked;
  const hasUpper = uppercaseEle.checked;
  const hasNumber = numbersEle.checked;
  const hasSymbol = symbolsEle.checked;

  resultEle.innerText = generatePassword(
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol,
    length
  );
});

//Generate Password Function
const generatePassword = (upper, lower, number, symbol, length) => {
  let generatedPassword = "";

  //To check which options are checked and get a count
  const typesCount = upper + lower + number + symbol;

  //If no option is clicked alert the user to select atleast one
  if (typesCount === 0) {
    alert("Password cannot be generated! Please select atleast one checkbox!");
  }

  //Filter out which options are checked
  const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const functionName = Object.keys(type)[0];

      generatedPassword += randomFunc[functionName]();
    });
  }

  return generatedPassword.slice(0, length);
};

//Copy Password to clipboard
clipboardEle.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEle.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  alert("Password copied to clipboard!");
});
