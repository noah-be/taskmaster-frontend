import request from "supertest";
import app, { startServer, stopServer } from "../app";

const testUserData = {
  username: "testuser_" + Date.now(),
  password: "Password5%",
  isGoogleAccount: false,
};

beforeEach(async () => {
  startServer();
});

afterEach(async () => {
  await stopServer();
});

describe("Unauthenticated Routes", () => {
  it("should access a public route", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
