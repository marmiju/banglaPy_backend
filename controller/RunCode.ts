import { Request, Response } from "express";
import { runPythonCode } from "../services/pistonRunner";
import { errorMap } from "../formating/ErrFormate";
import { convertedpython } from "../services/convertedPython";

export const RunCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, input } = req.body as { code?: string; input?: string };

    if (!code) {
      res.status(400).json({ error: "No code provided" });
      return;
    }

    const converted = await convertedpython(code);

    const { stderr, stdout } = await runPythonCode(converted, input);

    res.json({
      success: true,
      pythonCode: converted,
      output: stdout,
      stderr: HandleErr(
        stderr.includes("main.py") ? stderr.slice(stderr.indexOf("main.py") + 10) : ""
      ),
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: "Execution failed",
      details: err instanceof Error ? err.message : String(err),
    });
  }
};

export const HandleErr = (err: string): string => {
  let formatted = err;
  errorMap.forEach((rule) => {
    formatted = formatted.replace(rule.from, rule.to);
  });
  return formatted;
};

