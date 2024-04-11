import request from "supertest";
import app, { getServerStatus, startServer, stopServer } from "../app";

describe("Server Control", () => {
  let server;

  it("should start the server", async () => {
    server = await startServer();

    expect(getServerStatus()).toBe(true);
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  it("should stop the server", async () => {
    await stopServer();
    expect(getServerStatus()).toBe(false);
  });
});
