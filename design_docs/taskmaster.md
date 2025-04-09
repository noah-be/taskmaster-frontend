# New Project Template

## 1. Introduction

### 1.1 Purpose
This document describes the architecture of the MVP for the TaskMaster app. The goal is to document technical decisions and project structure for educational purposes. It is not intended for production use or real users, but rather to deepen understanding of Vue.js, Node.js, MongoDB, and authentication practices.

### 1.2 Scope
The project includes basic features like user login, task creation, updating, deletion, and storing data in a database. It focuses on implementing full-stack concepts in a personal learning environment.

### 1.3 Definitions, Acronyms, and Abbreviations
+ MVP: Minimum Viable Product
+ API: Application Programming Interface
+ DB: Database
+ JWT: JSON Web Token

### 1.4 References
+ [Vue 3 Documentation](https://devdocs.io/vue~3/)
+ [Node.js Documentation](https://nodejs.org/api/all.html)
+ [MongoDB Documentation](https://www.mongodb.com/docs/)
+ [JWT Specification](https://www.rfc-editor.org/rfc/rfc7519)
+ [Vuetify Documentation](https://vuetifyjs.com/en/)

### 1.5 Overview
This document outlines the architectural approach, high-level system overview, chosen technologies, quality considerations, and identified risks or limitations from a learning perspective.

## 2. Architectural Representation

### 2.1 Architectural Style and Rationale
The system uses a Monolithic Architecture to simplify development and deployment. As this is a learning project, a monolithic setup helps focus on understanding full-stack concepts without introducing unnecessary complexity.

## 3. System Stakeholders and Concerns

### 3.1 Stakeholders
+ Only Me (the developer/learner): This project is self-directed and not intended for other users or customers.

### 3.2 System Concerns
+ Learning Value: The project must provide a good learning experience across the stack.
+ Simplicity: Avoid overengineering; stick to well-documented tools and patterns.
+ Security Awareness: Understand basic security practices even if the system isn’t public.

## 4. System Overview

### 4.1 High-Level Description
TaskMaster is a simple task management app with a frontend (Vue 3 + Vuetify) and backend (Node.js + Express). The backend handles API requests and stores data in MongoDB. Users can register, log in, and manage a personal list of tasks.

## 5. Architectural Strategies

### 5.1 Key Strategies
+ Frontend:
    + Built with Vue 3 and Vuetify for UI components.
    + Uses Pinia for state management and i18n for multilingual support.
+ Backend
    + Node.js + Express.js for handling API requests.
    + JWT for authentication and route protection.
+ Database
    + MongoDB for document-based storage of users and tasks.
+ Security
    + Passwords hashed with bcrypt.
    + Tokens stored in HTTP-only cookies.

## 6. System Architecture

### 6.1 Modules
+ Frontend: UI, state handling, and API interaction.
+ Backend: Routes for auth and task management, validation, and error handling.
+ Database: Stores users, tasks, and optional auth codes.

### 6.2 Component Diagrams
# TODO

### 6.3 Database Design

#### User Collection
---------------
Stores information about each registered user, supporting both traditional and Google-based authentication.

Fields:
- username         : String (required, unique, trimmed)
- password         : String (required unless isGoogleAccount is true, hashed)
- isGoogleAccount  : Boolean (default: false)
- googleId         : String (optional, unique for Google accounts)
- createdAt        : Date (automatically generated)
- updatedAt        : Date (automatically generated)


#### Task Collection
---------------
Stores individual tasks created by users. Each task references a user and includes optional metadata.

Fields:
- title            : String (required, trimmed)
- description      : String (optional, trimmed)
- dueDate          : Date (optional)
- completed        : Boolean (default: false)
- priority         : String (enum: 'High', 'Medium', 'Low'; default: 'Low')
- user             : ObjectId (required, references User)
- createdAt        : Date (automatically generated)
- updatedAt        : Date (automatically generated)

## 7. Key Architectural Decisions

### 7.1 Decision Log
# TODO

## 8. Quality Attributes

### 8.1 Performance
+ Keep frontend responsive and backend endpoints lightweight.

### 8.2 Scalability
+ Not a concern for this project, but code is modular enough to grow if needed.

### 8.3 Security
+ Apply basic best practices (hashed passwords, token-based sessions).

### 8.4 Maintainability
+ Use clear folder structure and meaningful commit history.
+ Document setup and usage in README.md.

## 9. Risks and Technical Debt

### 9.1 Identified Risks
+ Over-scoping: Trying to implement too much at once.
+ Security assumptions: Mistakes may be made due to limited real-world exposure.

### 9.2 Technical Debt
+ Minimal tests at first to focus on features.

## 10. Appendices

### 10.1 Glossary
# TODO

### 10.2 Index
# TODO

### 10.3 Revision History
# TODO