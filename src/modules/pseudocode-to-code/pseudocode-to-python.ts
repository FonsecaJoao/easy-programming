const KEYWORDS = {
  // LOGICAL_OPERATORS
  AND: "and",
  OR: "or",
  NOT: "not",
  // CONDITIONAL_OPERATORS
  IF: "if",
  ELSE: "else:",
  "ELSE IF": "elif",
  // BOOLEAN_OPERATORS
  TRUE: "True",
  FALSE: "False",
  // LOOP_OPERATORS
  FOR: "for",
  WHILE: "while",
  BREAK: "break",
  CONTINUE: "continue",
  PASS: "pass",
  IN: "in",
  // FUNCTION_OPERATORS
  DEFINE: "def",
  FUNCTION: "",
  RETURN: "return",
  // NULL_OPERATORS
  NULL: "None",
  // COMPARISON_OPERATORS
  EQUALS: "==",
  DIFFERENT: "!=",
  "LOWER THAN": "<",
  "HIGHER THAN": ">",
  "LOWER OR EQUALS THAN": "<=",
  "HIGHER OR EQUALS THAN": ">=",
  // ARITHMETIC_OPERATORS
  PLUS: "+",
  MINUS: "-",
  TIMES: "*",
  DIVIDE: "/",
  MODULUS: "%",
  "POWER OF": "**",
  "DIVIDE AND ROUND DOWN": "//",
  // ASSIGNMENT_OPERATORS
  ASSIGN: "=",
  // INCREMENT_OPERATORS
  INCREMENT: "+=",
  DECREMENT: "-=",
  // MISC_OPERATORS
  OUTPUT: "print",
  INPUT: "input",
};

export function pseudoCodeToPython(pseudoCode: string[]): string {
  if (pseudoCode?.length === 0) throw new Error("Can't convert what is empty");
  for (let line of pseudoCode) {
    const lineIndex = pseudoCode.indexOf(line);
    // split line into words
    const lineWordsList = line.split(/\s/g);

    for (const key in KEYWORDS) {
      if (lineWordsList.includes(key)) {
        const keywordIndex = lineWordsList.indexOf(key);
        lineWordsList[keywordIndex] = (KEYWORDS as any)[key];
        pseudoCode[lineIndex] = lineWordsList.join(" ");
      }
    }
  }
  return pseudoCode.join("\n");
}
