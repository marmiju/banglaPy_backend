function manageIndentation(lines) {
  let indentedLines = [];
  let indentLevel = 0;

  lines.forEach((line, i) => {
    let trimmed = line.trim();

    // আগের লাইনে যদি ":" থাকে, তাহলে indent বাড়াও
    if (i > 0 && lines[i - 1].trim().endsWith(":")) {
      indentLevel += 1;
    }

    // যদি else বা elif হয়, তাহলে আগের indent কমাও
    if (/^(else|elif)/.test(trimmed)) {
      indentLevel = Math.max(indentLevel - 1, 0);
    }

    // Apply indent
    indentedLines.push("    ".repeat(indentLevel) + trimmed);

    // যদি এই লাইনেও ":" থাকে, কিন্তু পরেরটা else নয় — indent বাড়বে পরেরটার জন্য
    if (trimmed.endsWith(":") && !/^(else|elif)/.test(trimmed)) {
      // nothing yet — পরের iteration এ বাড়বে
    }

    // যদি আগেরটা ":" দিয়ে শেষ না হয় এবং এখনকার লাইন empty না হয়, তাহলে indent reset
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
