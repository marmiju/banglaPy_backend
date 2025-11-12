async function runPythonCode(code,input) {

  const response = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language: "python",
      version: "3.10.0",
      files: [{ name: "main.py", content: code}],
      stdin: input,
    }),
  });


  const result = await response.json();
  return {stdout:result.run?.stdout, stderr:result.run?.stderr}; 
}

module.exports = { runPythonCode };
