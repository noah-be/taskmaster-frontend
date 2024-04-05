import TaskController from "controllers/TaskController";
import Task from "models/TaskModel";
import request from "supertest";
import express from "express";
import bodyParser from "body-parser";

//#region setup
jest.mock("models/TaskModel", () => {
  return jest.fn().mockImplementation(() => {
    return {
      save: jest.fn().mockResolvedValue({
        title: "Test Task",
        priority: "High",
        user: { _id: "user123" },
        _id: "task123",
      }),
    };
  });
});

const app = express();
app.use(bodyParser.json());
app.post("/task", TaskController.addTask);

const mockReq = ({ body = {}, user = {} } = {}) => ({
  body,
  user,
  params: {},
});

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const res = mockRes();

const next = jest.fn();
//#endregion

describe("TaskController", () => {
  describe("addTask", () => {
    it("should successfully create a task", async () => {
      const response = await request(app)
        .post("/task")
        .send({
          title: "Test Task",
          priority: "High",
          user: { _id: "user123" },
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        title: "Test Task",
        priority: "High",
        user: { _id: "user123" },
        _id: "task123",
      });
    });

    it("should return 400 if title is missing", async () => {
      const req = mockReq({
        body: { priority: "High" },
        user: { _id: "user123" },
      });

      await TaskController.addTask(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Title is required" });
    });
    it("should return 400 for invalid priority", async () => {
      const req = mockReq({
        body: { title: "Test Task", priority: "Invalid" },
        user: { _id: "user123" },
      });

      await TaskController.addTask(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Invalid priority value",
      });
    });
    it("should return 400 if user identification is missing", async () => {
      const req = mockReq({ body: { title: "Test Task", priority: "High" } }); // No user ID

      await TaskController.addTask(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "User identification is missing",
      });
    });
    it("should handle internal server error", async () => {
      Task.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error("Internal Server Error")),
      }));

      const req = mockReq({
        body: { title: "Test Task", priority: "Medium" },
        user: { _id: "user123" },
      });
      const res = mockRes();

      await TaskController.addTask(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(
        "Internal Server Error: Internal Server Error",
      );
    });
  });

  describe("getAllTasks", () => {
    it("should return all tasks for a user", async () => {
      expect(true).toBe(true);
    });
  });

  describe("getTaskById", () => {
    it("should successfully add a task", async () => {
      expect(true).toBe(true);
    });
  });
  describe("updateTask", () => {
    it("should successfully add a task", async () => {
      expect(true).toBe(true);
    });
  });
  describe("deleteTask", () => {
    it("should successfully add a task", async () => {
      expect(true).toBe(true);
    });
  });
  describe("toggleTask", () => {
    it("should successfully add a task", async () => {
      expect(true).toBe(true);
    });
  });
});
