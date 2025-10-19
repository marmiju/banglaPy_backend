async function runPythonCode(code) {
  const response = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language: "python",
      version: "3.10.0",
      files: [{ name: "main.py", content: code }],
    }),
  });

  const result = await response.json();
  return result.run?.output || "No output";
}

module.exports = { runPythonCode };
