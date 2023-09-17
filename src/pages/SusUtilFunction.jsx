function calculateSum(a, b) {
  // Error 1: Unused parameter 'b'
  const sum = a;
  return sum;
}

// Error 2: Function name should be in camelCase
function INVALID_FUNCTION_NAME() {
  return 'This function name violates the naming convention';
}

// Error 3: Missing 'const' declaration for a constant variable
myConstant = 42;

// Error 4: Accessing an undefined variable
function accessUndefinedVariable() {
  // Attempting to access 'undefinedVariable'
  return undefinedVariable;
}

// Error 5: Unhandled promise rejection
async function fetchData() {
  try {
    await fetch('https://example.com/api');
  } catch (error) {
    // Error handling code missing
  }
}

// Error 6: Insecure use of Math.random() for generating random tokens
const insecureRandomToken = Math.random().toString(36).substring(2);

// Error 7: No validation for user input
function validateUserInput(userInput) {
  // No validation logic implemented
  return userInput;
}

// Error 8: Use of 'eval' function
function useEvalFunction() {
  const code = 'console.log("Using eval can be unsafe.")';
  eval(code);
}

export default {
  calculateSum,
  fetchData,
  insecureRandomToken,
  validateUserInput,
  useEvalFunction,
};
