interface opcode {
  [opcode: string]: string;
}

export const opcodes: opcode = {
  //memory reference
  "0000": "ADD", //add
  "0001": "AND", //and
  "0010": "LDA", //load AC
  "0011": "STA", //store AC
  "0100": "BUN", //branch unconditionally
  "0101": "BSA", //branch and save address
  "0110": "ISZ", //increment and skip if zero

  //register reference
  "1000": "CLA", //clear AC
  "1001": "CMA", //complement AC
  "1010": "INC", //increment AC
  "1011": "DEC", //decrement DC
  "1100": "SPA", //skip if AC positive
  "1101": "SNA", //skip if AC negative
  "1110": "SZA", //skip if AC zero
  "1111": "HLT", //halt the program
};
