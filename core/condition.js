function handleCondition(line) {
  let trimmed = line.trim();

  // "যদি x > y ঃ" → "if x > y:"
  if (trimmed.startsWith("যদি")) {
    trimmed = trimmed.replace(/যদি\s+(.+)ঃ?/, "if $1:");
  }

  // "নয়তোঃ" → "else:"
  if (trimmed.startsWith("নয়তো")) {
    trimmed = trimmed.replace(/নয়তোঃ?/, "else:");
  }

  return trimmed;
}

module.exports = { handleCondition };
