function handleVariables(line) {
  // উদাহরণ: "আম = ৪০" → "আম = 40"
  if (line.includes("=")) {
    return line;
  }
  return line;
}

module.exports = { handleVariables };
