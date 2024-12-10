# Private todo list 📋✅

This project is a personal learning initiative focused on understanding the basics of web development. It includes practical implementations of user authentication and task management to provide a hands-on experience with essential web technologies. Tailored as a self-guided exploration, this project documents my progress and serves as a reference for fundamental concepts in building and deploying web applications. It is designed for personal use, to track learning milestones and challenges encountered along the way.

## Roadmap (Work in Progress) 🎯

- Add roadmap

## Features ✨

- Task and users are stored in the database
- Authentification for all users
- Users can view, create, update, delete tasks
- Authorization: Users can only manage their own tasks


## Project Structure ℹ️

- `/frontend`: Contains the Vue.js-based frontend, integrated with Vuetify
- `/backend`: Contains the Node.js-based backend
- Docker Compose is used to simplify running the backend locally


## Run Locally 🖥️

1. **Clone the project**

```bash
  git clone https://github.com/noah-be/private-to-do-list.git
```

2. **Go to the project directory**

```bash
  cd private-to-do-list
```

3. **Install Dependencies**

```bash
cd backend

npm install

cd ../frontend

npm install
```


4. **Start backend with docker-compose**

```bash
  cd ..
  docker-compose up -d
```

5. **Start frontend**

```bash
  cd frontend
  npm run dev
```



## Running Tests 🧪

The test files can be found in the tests folder in the frontend and backend.
To run tests, run the following command in the appropriate folder

```bash
  npm run test
```

## Screenshots (Old version without Vue and Vuetify) 👀

![homepage](/screenshots/homepage.png)

![task](/screenshots/tasks.png)

![edit-tasks](/screenshots/edit-task.png)

## Clean code (Work in Progress) 🧐

- proper an consistent naming conventions
- self-documenting
- DRY
- intention revealing variable and function names
- no dead code
- seperation of concern and good structure
- simplicity
- using tools like eslint to find problematic code formatting
