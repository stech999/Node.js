function generateUniqueNumbers(count, min, max) {
    let uniqueNumbers = new Set();

    while (uniqueNumbers.size < count) {
        let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        uniqueNumbers.add(randomNum);
    }

    return Array.from(uniqueNumbers);
}

module.exports = { generateUniqueNumbers };