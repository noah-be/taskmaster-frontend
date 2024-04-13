import request from "supertest";

import app from "../../../app";

export function runAuthRoutesTests() {
  describe("Auth Route Tests", () => {
    it("should handle missing username on registration", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({ password: "testpass123", username: "" });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain(
        "Username and password are required",
      );
    });

    it("should handle invalid login attempt", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ username: "nonexistent", password: "wrongpass" });
      expect(response.status).toBe(401);
      expect(response.body.message).toContain("Invalid credentials");
    });
  });
}
