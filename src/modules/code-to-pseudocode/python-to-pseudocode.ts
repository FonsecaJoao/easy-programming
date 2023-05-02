const KEYWORDS = {
  // LOGICAL_OPERATORS
  and: "AND",
  or: "OR",
  not: "NOT",
  // CONDITIONAL_OPERATORS
  if: "IF",
  else: "ELSE",
  ["else:"]: "ELSE",
  elif: "ELSE IF",
  // BOOLEAN_OPERATORS
  True: "TRUE",
  False: "FALSE",
  // LOOP_OPERATORS
  for: "FOR",
  while: "WHILE",
  break: "BREAK",
  continue: "CONTINUE",
  pass: "PASS",
  in: "IN",
  // FUNCTION_OPERATORS
  def: "DEFINE FUNCTION",
  return: "RETURN",
  // NULL_OPERATORS
  None: "NULL",
  // COMPARISON_OPERATORS
  "==": "EQUALS",
  "!=": "DIFFERENT",
  "<": "LOWER THAN",
  ">": "HIGHER THAN",
  "<=": "LOWER OR EQUALS THAN",
  ">=": "HIGHER OR EQUALS THAN",
  // ARITHMETIC_OPERATORS
  "+": "PLUS",
  "-": "MINUS",
  "*": "TIMES",
  "/": "DIVIDE",
  "%": "MODULUS",
  "**": "POWER OF",
  "//": "DIVIDE AND ROUND DOWN",
  // ASSIGNMENT_OPERATORS
  "=": "ASSIGN",
  // INCREMENT_OPERATORS
  "+=": "INCREMENT",
  "-=": "DECREMENT",
  // MISC_OPERATORS
  print: "OUTPUT",
  input: "INPUT",
};

export function pythonToPseudocode(code: string[]): string {
  if (code?.length === 0) throw new Error("Can't convert what is empty");

  for (let line of code) {
    const lineIndex = code.indexOf(line);
    // split line into words
    const lineWordsList = line.split(/\s/g);

    for (const key in KEYWORDS) {
      if (lineWordsList.includes(key)) {
        const keywordIndex = lineWordsList.indexOf(key);
        lineWordsList[keywordIndex] = (KEYWORDS as any)[key];
        code[lineIndex] = lineWordsList.join(" ");
      }
    }
  }
  return code.join("\n");
}
