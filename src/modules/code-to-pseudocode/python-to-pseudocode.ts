const KEYWORDS = {
  // LOGICAL_OPERATORS
  and: "AND",
  or: "OR",
  not: "NOT",
  // CONDITIONAL_OPERATORS
  if: "IF",
  else: "ELSE",
  ["else:"]: "ELSE",
  elif: "ELSE_IF",
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
  def: "DEFINE_FUNCTION",
  return: "RETURN",
  // NULL_OPERATORS
  None: "NULL",
  // COMPARISON_OPERATORS
  "==": "EQUALS",
  "!=": "DIFFERENT",
  "<": "LOWER_THAN",
  ">": "HIGHER_THAN",
  "<=": "LOWER_OR_EQUALS_THAN",
  ">=": "HIGHER_OR_EQUALS_THAN",
  // ARITHMETIC_OPERATORS
  "+": "PLUS",
  "-": "MINUS",
  "*": "TIMES",
  "/": "DIVIDE",
  "%": "MODULUS",
  "**": "POWER_OF",
  "//": "DIVIDE_AND_ROUND_DOWN",
  // ASSIGNMENT_OPERATORS
  "=": "ASSIGN",
  // INCREMENT_OPERATORS
  "+=": "INCREMENT",
  "-=": "DECREMENT",
  "*=": "TIMES_EQUALS",
  "/=": "DIVIDE_EQUALS",
  "%=": "MODULUS_EQUALS",
  "**=": "POWER_OF_EQUALS",
  "//=": "DIVIDE_AND_ROUND_DOWN_EQUALS",
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
