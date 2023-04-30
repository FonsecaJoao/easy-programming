const KEYWORDS = {
  // LOGICAL_OPERATORS
  and: "AND",
  or: "OR",
  not: "NOT",
  // CONDITIONAL_OPERATORS
  if: "IF",
  else: "ELSE",
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
  // FUNCTION_OPERATORS
  def: "DEFINE FUNCTION",
  return: "RETURN",
  // CLASS_OPERATORS
  class: "DEFINE CLASS",
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
  "+": "SUM",
  "-": "SUBTRACTION",
  "*": "MULTIPLY",
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

export function pythonToPseudocode(code: string[]) {
  if (code?.length === 0) throw new Error("Can't convert what is empty");
  console.log(code);
  for (const line of code) {
	  const lineIndex = code.indexOf(line);
	  
	  // split line into words
	  const lineWordsList = line.split(/\s/g);
	  
	  console.log("One time for line!!!!!!", lineWordsList);

    for (const key in KEYWORDS) {
    //   console.log("key", key);
    //   console.log("value", (KEYWORDS as any)[key]);
	  if (lineWordsList.includes(key)) {
		  console.log("key", key);
		  console.log("value", (KEYWORDS as any)[key]);
		  const keywordIndex = lineWordsList.indexOf(key);
		  lineWordsList[keywordIndex] = (KEYWORDS as any)[key];
		  code[lineIndex] = lineWordsList.join(" ");
	  }
    }
  }
  console.log(code);
  
}
