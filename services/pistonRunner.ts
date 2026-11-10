export interface PistonRunResult {
  stdout: string;
  stderr: string;
}

interface PistonApiResponse {
  run?: {
    stdout?: string;
    stderr?: string;
  };
}

export async function runPythonCode(code: string, input?: string): Promise<PistonRunResult> {
  const response = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language: "python",
      version: "3.10.0",
      files: [{ name: "main.py", content: code }],
      stdin: input,
    }),
  });

  const result = (await response.json()) as PistonApiResponse;
  return {
    stdout: result.run?.stdout ?? "",
    stderr: result.run?.stderr ?? "",
  };
}

