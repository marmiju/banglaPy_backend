export const Print = (value: string): string => {
  const expr = value.replace("লিখো", "").trim();
  return `print(${expr})`;
};

