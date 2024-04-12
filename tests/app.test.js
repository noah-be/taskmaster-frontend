import request from "supertest";
import app, { startServer, stopServer, getServerStatus } from "../app";
import * as dbModule from "../config/dbConnect";
import { async } from "fast-glob";

describe("Server Control", () => {
  beforeAll(async () => {
    jest
      .spyOn(dbModule, "dbConnect")
      .mockImplementation(() => Promise.resolve());
  });

  afterAll(async () => {
    jest.spyOn(dbModule, "dbConnect").mockRestore();
  });

  describe("Normal Operations", () => {
    it("should start the server", async () => {
      await startServer();
      expect(getServerStatus()).toBe(true);
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
    });

    it("should stop and restart the server", async () => {
      await stopServer();
      expect(getServerStatus()).toBe(false);
      await startServer();
      expect(getServerStatus()).toBe(true);
    });
  });

  describe("Error Handling", () => {
    afterAll(async () => {
      jest.spyOn(dbModule, "dbConnect").mockRestore();
      await stopServer();
    });

    it("should handle errors during server startup", async () => {
      dbModule.dbConnect.mockImplementationOnce(() =>
        Promise.reject(new Error("Database connection failed")),
      );
      await expect(startServer()).rejects.toThrow("Database connection failed");
      dbModule.dbConnect.mockReset();
    });
  });
});
