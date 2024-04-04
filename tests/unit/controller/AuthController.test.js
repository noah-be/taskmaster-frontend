import AuthController from "controllers/AuthController";
import { createUser, validateUser } from "utils/userUtils";
import { finalizeAuthentication } from "utils/authUtils";
import Task from "models/TaskModel";

//#region setup
jest.mock("utils/userUtils", () => ({
  createUser: jest.fn(),
  validateUser: jest.fn(),
}));
jest.mock("utils/authUtils", () => ({
  finalizeAuthentication: jest.fn(),
}));
jest.mock("models/TaskModel", () => ({ insertMany: jest.fn() }));

const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();
//#endregion

describe("AuthController", () => {
  describe("register", () => {
    const mockUser = { _id: "user123" };
    const mockReq = {
      body: { username: "testUser", password: "testPass" },
    };

    it("should successfully register a user", async () => {
      createUser.mockResolvedValue(mockUser);
      Task.insertMany.mockResolvedValue([]);
      finalizeAuthentication.mockResolvedValue({ redirectUrl: "/tasks" });

      await AuthController.register(mockReq, mockRes, next);

      expect(createUser).toHaveBeenCalledWith("testUser", "testPass");
      expect(Task.insertMany).toHaveBeenCalled();
      expect(finalizeAuthentication).toHaveBeenCalledWith(
        mockRes,
        mockUser._id,
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it("should return 400 if username or password is missing", async () => {
      const req = { body: {} };
      await AuthController.register(req, mockRes, next);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    it("should handle createUser error", async () => {
      createUser.mockRejectedValue(new Error("Create user failed"));
      await AuthController.register(mockReq, mockRes, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("login", () => {
    const mockUser = { _id: "user123" };
    const mockReq = {
      body: { username: "testUser", password: "testPass" },
    };

    it("should successfully login a user", async () => {
      validateUser.mockResolvedValue(mockUser);
      finalizeAuthentication.mockResolvedValue({ redirectUrl: "/tasks" });

      await AuthController.login(mockReq, mockRes, next);

      expect(validateUser).toHaveBeenCalledWith("testUser", "testPass");
      expect(finalizeAuthentication).toHaveBeenCalledWith(
        mockRes,
        mockUser._id,
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it("should return 400 if username or password is missing", async () => {
      const req = { body: {} };
      await AuthController.login(req, mockRes, next);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    it("should handle validateUser error", async () => {
      validateUser.mockRejectedValue(new Error("Validate user failed"));
      await AuthController.login(mockReq, mockRes, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
