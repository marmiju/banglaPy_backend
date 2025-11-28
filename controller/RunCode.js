
const { runPythonCode } = require("../services/pistonRunner");
const { errorMap } = require("../formating/ErrFormate");
const { convertedpython } = require("../services/convertedPython");
const { activity } = require("./activityController/Activity");

const RunCode = async (req, res) => {
  try {
    const { code,input } = req.body;
    
    if (!code) return res.status(400).json({ error: "No code provided"});

    const converted = await convertedpython(code)
  
    const { stderr, stdout } = await runPythonCode(converted,input);


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

    formatted = formatted.replace(rule.from, rule.to);
  });
  return formatted;
};

module.exports = { RunCode,HandleErr };
