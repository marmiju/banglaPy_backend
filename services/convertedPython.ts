import { mapping, banglaDigits } from "../formating/formate";
import { Print } from "../core/Print";
import { handleVariables } from "../core/variables";
import { handleLoop } from "../core/loop";
import { handleCondition } from "../core/condition";

export const convertedpython = async (code: string): Promise<string> => {
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

  return converted;
};

