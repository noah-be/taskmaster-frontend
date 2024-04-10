import request from "supertest";
import app, { startServer, stopServer } from "../../app";

beforeEach(async () => {
  startServer();
});

afterEach(async () => {
  await stopServer();
});

describe("Public Routes", () => {
  it("should access the home page", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
  it("should access the about page", async () => {
    const response = await request(app).get("/about");
    expect(response.statusCode).toBe(200);
  });

  it("should access the contact page", async () => {
    const response = await request(app).get("/contact");
    expect(response.statusCode).toBe(200);
  });
});
