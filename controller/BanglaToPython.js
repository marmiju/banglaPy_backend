const { mapping, banglaDigits } = require("../formating/formate");
const { Print } = require("../core/Print");
const { handleVariables } = require("../core/variables");
const { handleLoop } = require("../core/loop");
const { handleCondition } = require("../core/condition");
const { runPythonCode } = require("../services/pistonRunner");
const { manageIndentation } = require("../indentation/Indentaion");
const { errorMap } = require("../formating/ErrFormate");

const runBanglaCode = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "No code provided" });

    let converted = code.replace(/[০-৯]/g, (d) => banglaDigits[d]);

    // replacing based on mapping
    mapping.forEach((rule) => {
      converted = converted
        .split(/(".*?"|'.*?')/g)
        .map((part) => {
          if (part.startsWith('"') || part.startsWith("'")) {
            return part;
          }
          return part.replace(rule.from, rule.to);
        })
        .join("");
    });


    // Process each line
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

    // Handle indentation properly
    converted = converted
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    converted = manageIndentation(converted);
    const {stderr,stdout} = await runPythonCode(converted);

    res.json({
      success: true,
      pythonCode: converted,
      output: stdout,
      stderr : HandleErr(stderr.slice(50)),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Execution failed",
      details: err.message,
    });
  }

};

const HandleErr = (err) => {
  let formatted = err; // keep original full message

  errorMap.forEach((rule) => {
    formatted = formatted.replace(rule.from, rule.to);
  });

  return formatted;
};



module.exports = { runBanglaCode };
