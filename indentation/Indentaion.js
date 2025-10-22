function manageIndentation(lines) {
  let indentedLines = [];
  let indentLevel = 0;

  lines.forEach((line, i) => {
    let trimmed = line.trim();

    if (i > 0 && lines[i - 1].trim().endsWith(":")) {
      indentLevel += 1;
    }

    if (/^(else|elif)/.test(trimmed)) {
      indentLevel = Math.max(indentLevel - 1, 0);
    }

    // Apply indent
    indentedLines.push("    ".repeat(indentLevel) + trimmed);

    if (trimmed.endsWith(":") && !/^(else|elif)/.test(trimmed)) {
    }

    if (
      i > 0 &&
      !lines[i - 1].trim().endsWith(":") &&
      trimmed !== "" &&
      !/^(else|elif)/.test(trimmed)
    ) {
      // do nothing (stay same)
    }
  });

  return indentedLines.join("\n");
}

module.exports = { manageIndentation };
