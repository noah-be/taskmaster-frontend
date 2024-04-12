import User from "models/UserModel";
import bcrypt from "bcryptjs";
import puppeteer from "puppeteer";
import { startServer, stopServer } from "../../app";

export function runFunctionalTests() {
  describe("Login Page Functional Test", () => {
    let browser;
    let page;

    beforeAll(async () => {
      await startServer();
      browser = await puppeteer.launch({ headless: true });
      page = await browser.newPage();

      const hashedPassword = await bcrypt.hash("Password7/#", 12);

      await User.create({
        username: "testuser",
        password: hashedPassword,
        isGoogleAccount: false,
      });
    });

    afterAll(async () => {
      await User.deleteMany({});
      await browser.close();
      await stopServer();
    });

    it("should redirect to tasks page upon successful login", async () => {
      await page.goto("http://localhost:3002");
      await page.type("#login-username", "testuser");
      await page.type("#login-password", "Password7/#");
      await page.click("#login-btn");
      await page.waitForNavigation();
      expect(page.url()).toContain("/tasks");
    });

    it("should allow a user to register and redirect to tasks page", async () => {
      await page.goto("http://localhost:3002");
      await page.click("#create-new-account-btn");
      await page.waitForSelector("#register-box");

      await page.type("#register-username", "newuser");
      await page.type("#register-password", "123");
      await page.click("#sign-up-btn");

      await page.waitForNavigation();
      expect(page.url()).toContain("/tasks");
    });
  });
}
