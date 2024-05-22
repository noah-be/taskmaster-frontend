import { runFunctionalTests } from "./functionalTests.js";
import { runAccessibilityTests } from "./accessibilityTests.js";

describe("Frontend Tests", () => {
  runFunctionalTests();
  runAccessibilityTests();
}, 15000);
