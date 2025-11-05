const { mapping, banglaDigits } = require("../formating/formate");
const { Print } = require("../core/Print");
const { handleVariables } = require("../core/variables");
const { handleLoop } = require("../core/loop");
const { handleCondition } = require("../core/condition");
const { runPythonCode } = require("../services/pistonRunner");
const { errorMap } = require("../formating/ErrFormate");

const runBanglaCode = async (req, res) => {
  try {
    const { code,input } = req.body;
    if (!code) return res.status(400).json({ error: "No code provided" });

    console.log(code)

   
    let converted = code.replace(/[০-৯]/g, (d) => banglaDigits[d]);

    // Mapping replace 
    mapping.forEach((rule) => {
      converted = converted
        .split(/(".*?"|'.*?')/g)
        .map((part) => {
          if (part.startsWith('"') || part.startsWith("'")) return part;
          return part.replace(rule.from, rule.to);
        })
        .join("");
    });

    // line corrections
    let lines = converted.split("\n");

    lines = lines.map((line) => {
      line = handleVariables(line);
      line = handleCondition(line);
      line = handleLoop(line);
      if (line.trim().startsWith("লিখো")) {
        return Print(line);
      }
      return line;
    });
    // converted = manageIndentation(lines);
    const { stderr, stdout } = await runPythonCode(converted,input);

    console.log(stdout)
    res.json({
      success: true,
      pythonCode: converted,
      output: stdout,
      stderr: HandleErr(stderr.includes("main.py") ? stderr.slice(stderr.indexOf("main.py")+10) : ""),
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
  let formatted = err;
  errorMap.forEach((rule) => {
    console.log(rule)
    formatted = formatted.replace(rule.from, rule.to);
  });
  return formatted;
};

module.exports = { runBanglaCode };
