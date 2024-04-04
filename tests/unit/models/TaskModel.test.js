var util = require("util");
var encoder = new util.TextEncoder("utf-8");

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Task from "models/TaskModel.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Task Model Test", () => {
  it("Create task successfully", async () => {
    const validTask = {
      title: "Test Title",
      description: "Test Description",
      dueDate: Date.now(),
      user: mongoose.Types.ObjectId(),
    };
    const savedTask = await new Task(validTask).save();

    expect(savedTask._id).toBeDefined();
    expect(savedTask.title).toBe(validTask.title);
    expect(savedTask.description).toBe(validTask.description);
    expect(savedTask.completed).toBeFalsy();
    expect(savedTask.priority).toBe("Low");
  });

  it("Insert task successfully, but the field not defined in schema should be undefined", async () => {
    const taskWithInvalidField = {
      title: "Test Title",
      description: "Test Description",
      dueDate: Date.now(),
      user: mongoose.Types.ObjectId(),
      invalidField: "test",
    };
    const savedTaskWithInvalidField = await new Task(
      taskWithInvalidField,
    ).save();
    expect(savedTaskWithInvalidField._id).toBeDefined();
    expect(savedTaskWithInvalidField.invalidField).toBeUndefined();
  });

  it("Create task without required field should failed", async () => {
    const taskWithoutRequiredField = new Task({ title: "Test Title" });
    let err;
    try {
      await taskWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.user).toBeDefined();
  });

  test.each([
    {
      title: "   ",
      fieldName: "title",
      expectedIssue: "Path `title` is required.",
    },
  ])(
    "Fails creating a task with invalid $fieldName",
    async ({ title, fieldName, expectedIssue }) => {
      const invalidTask = new Task({
        title,
        user: mongoose.Types.ObjectId(),
      });
      await expect(invalidTask.save()).rejects.toThrow(expectedIssue);
    },
  );

  it("Check task priority enum validation", async () => {
    let err;
    try {
      await new Task({
        title: "Test Priority",
        priority: "InvalidPriority",
        user: mongoose.Types.ObjectId(),
      }).save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.priority).toBeDefined();
  });

  it("Task completion should be false by default", async () => {
    const task = await new Task({
      title: "Test Default Completion",
      user: mongoose.Types.ObjectId(),
    }).save();

    expect(task.completed).toBeFalsy();
  });

  it("Check task dueDate is a Date object", async () => {
    const task = await new Task({
      title: "Test Due Date",
      dueDate: new Date(),
      user: mongoose.Types.ObjectId(),
    }).save();

    expect(task.dueDate).toBeInstanceOf(Date);
  });
});
