export function handleVariables(line: string): string {
  // উদাহরণ: "আম = ৪০" → "আম = 40"
  if (line.includes("=")) {
    return line;
  }
  return line;
}

