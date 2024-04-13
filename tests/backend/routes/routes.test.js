import { runGeneralRoutesTests } from "./generalRouteTests";
import { runAuthRoutesTests } from "./authRoutesTest";
import { runTaskRoutesTests } from "./taskRouteTests";
import { startServer, stopServer } from "../../../app";

describe("Route Tests", () => {
  beforeAll(async () => {
    await startServer();
  });

  afterAll(async () => {
    await stopServer();
  });

  runGeneralRoutesTests();
  runAuthRoutesTests();
  runTaskRoutesTests();
});
