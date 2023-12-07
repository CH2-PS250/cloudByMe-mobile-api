const upperFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const toUpperFirstLetterWords = (word, separator = "-", replacer = "") => {
  if (!word || typeof word !== "string") {
    throw new Error("Word must be string and not empty");
  }

  const words = word.split(separator);
  if (words.length === 1) return upperFirstLetter(word);

  if (word.includes("jakarta") || word.includes("yogyakarta")) {
    return words[0].toUpperCase() + upperFirstLetter(words[1]);
  }

  return words.map(upperFirstLetter).join(replacer);
};

module.exports = toUpperFirstLetterWords;
