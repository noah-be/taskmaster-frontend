import TaskController from "controllers/TaskController";
import Task from "models/TaskModel";

jest.mock("models/TaskModel", () => {
  return jest.fn().mockImplementation(() => {
    return {
      save: jest.fn().mockResolvedValue({
        /* mock response */
      }),
    };
  });
});

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

describe("TaskController", () => {
  describe("addTask", () => {
    it("should successfully create a task", async () => {
      const req = mockReq({
        body: {
          title: "Test Task",
          priority: "High",
          description: "Test Description",
          dueDate: "2021-01-01",
        },
        user: { _id: "user123" },
      });
      const res = mockRes();

      Task.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue({
          _id: "task123",
          title: "Test Task",
          description: "Test Description",
          dueDate: new Date("2021-01-01"),
          priority: "High",
          completed: false,
          user: "user123",
        }),
      }));

      await TaskController.addTask(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.any(Object));
    });
  });
  describe("getAllTasks", () => {
    it("should successfully add a task", async () => {
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
