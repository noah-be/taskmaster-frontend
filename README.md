
# Private todo list

This project is a personal learning initiative focused on understanding the basics of web development. It includes practical implementations of user authentication and task management to provide a hands-on experience with essential web technologies. Tailored as a self-guided exploration, this project documents my progress and serves as a reference for fundamental concepts in building and deploying web applications. It is designed for personal use, to track learning milestones and challenges encountered along the way.


## Features

- Task and users are stored in the database
- Authentification for all users
- Users can view, create, update, delete tasks
- Authorization: Users can only manage their own tasks


## Run Locally

To set up this learning project on your local machine, you'll need Node.js and MongoDB. Follow these steps:

1. **Clone the project**

```bash
  git clone https://github.com/noah-frank/private-to-do-list.git
```

2. **Go to the project directory**

```bash
  cd private-to-do-list
```

3. **Install dependencies**

```bash
  npm install
```

4. **Configure MongoDB:**

   Make sure MongoDB is running on your system. Set up your MongoDB URI in the project’s `.env` file to connect to your database.

5. Start the server

```bash
  npm run start
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Screenshots

![homepage](/screenshots/homepage.png)

![task](/screenshots/tasks.png)

![edit-tasks](/screenshots/edit-task.png)




