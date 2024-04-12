import { runFunctionalTests } from "./functionalTests";
import { runAccessibilityTests } from "./accessibilityTests";

describe("Frontend Tests", () => {
  runFunctionalTests();
  runAccessibilityTests();
});
