function handleLoop(line) {
  let trimmed = line.trim();

  // "জন্য i পর্যন্ত ১০ঃ" → "for i in range(10):"
  if (trimmed.startsWith("জন্য")) {
    trimmed = trimmed
      .replace(/জন্য\s+(\w+)\s+পর্যন্ত\s+([^\sঃ]+)/, "for $1 in range($2)");
    trimmed = trimmed.replace(/ঃ/g, ":");
  }

  return trimmed;
}

module.exports = { handleLoop };
