const { mapping, banglaDigits } = require("../formating/formate");
const { Print } = require("../core/Print");
const { handleVariables } = require("../core/variables");
const { handleLoop } = require("../core/loop");
const { handleCondition } = require("../core/condition");
const { runPythonCode } = require("../services/pistonRunner");
const { manageIndentation } = require("../indentation/Indentaion");

const runBanglaCode = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "No code provided" });

    // Step 1️⃣: Replace Bangla digits
    let converted = code.replace(/[০-৯]/g, (d) => banglaDigits[d]);

    // Step 2️⃣: Replace simple keywords
    mapping.forEach((rule) => {
      converted = converted.replace(rule.from, rule.to);
    });

    // Step 3️⃣: Process each line
    converted = converted
      .split("\n")
      .map((line) => {
        line = handleVariables(line);
        line = handleCondition(line);
        line = handleLoop(line);

        if (line.trim().startsWith("লিখো")) {
          return Print(line);
        }

        return line;
      })
      .join("\n");

    // Step 4️⃣: Handle indentation properly 🧠
    converted = converted
      .split("\n")
      .map((l) => l.trim()) // clean up space
      .filter(Boolean); // remove empty lines

    converted = manageIndentation(converted); 

    // Step 5️⃣: Run converted Python code
    const output = await runPythonCode(converted);

    // Step 6️⃣: Send response
    res.json({
      success: true,
      pythonCode: converted,
      output: output.trim(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Execution failed",
      details: err.message,
    });
  }
};

module.exports = { runBanglaCode };
