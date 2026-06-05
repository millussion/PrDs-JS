# Workspace Reservation System SPA
---

This project involves developing a Single Page Application (SPA) using JavaScript, Vite, Tailwind CSS, and a JSON server.

The application simulates a workspace reservation system where users can authenticate, navigate protected paths, and manage information consumed from a simulated API.

The main objective is to assess knowledge related to:

- SPA Architecture
- Authentication
- Role Management
- Path Protection
- Session Persistence
- API Consumption
- DOM Manipulation
- Code Modularization
- Development Best Practices

---

## Problem Context

A company has several shared workspaces:

- Meeting Rooms
- Private Offices
- Coworking Spaces
- Auditoriums

To avoid scheduling conflicts and improve internal organization, a platform is needed to manage reservations for these spaces.

The application must include two roles:

### Administrator (admin)

Can:

- View all reservations
- Create reservations
- Edit reservations
- Delete reservations
- Approve or reject reservations
- Manage workspaces
- Access administrative modules

### User (user)

Can:

- Check available spaces
- Create reservations
- View only their own reservations
- Modify pending reservations
- Cancel their own reservations

---

## Technologies used

- JavaScript ES6+
- Vite
- Tailwind CSS
- JSON Server
- Concurrently
- HTML5
- CSS3

---

## Delivered base structure

```txt
src
├── assets
├── components
│ └── Sidebar.js
├── controllers
│ └── login.controller.js
├── router
│ └── router.js
├── views
│ ├── loginView.js
│ ├── homeView.js
│ └── notFound.js
├── utils.js
├── main.js
└── style.css
```

---

## Simulated API

The application uses a JSON server to simulate a REST API.

Example administrator user:

```json
{
"id": 1,
"email": "admin@test.com",
"password": "123456",
"role": "admin"
}
```

Example standard user:

```json
{
"id": 2,
"email": "user@test.com",
"password": "123456",
"role": "user"
}
```

---

## Environment Setup

Install dependencies:

```bash
npm install
```

Run project:

```bash
npm run dev
```

This command simultaneously starts:

- Vite
- JSON Server

thanks to the use of Concurrently.

---

## Suggested Scripts

```json
{
"scripts": {
"client": "vite",
"server": "json-server --watch db.json --port 3000",
"dev": "concurrently \"npm run client\" \"npm run server\""
}
}
```

---

## Test Credentials

Administrator:

```txt
admin@test.com
123456
```

User:

```txt
user@test.com
123456
```

---

## Included Basic Features

- Functional Login
- API Consumption via JSON Server
- Session Persistence with LocalStorage
- Logout
- SPA Router
- Basic Route Protection
- Reusable Sidebar
- Custom 404 Page
- Configuration of TailwindCSS
- Vite Configuration

---

## Modules pending development

Coders will need to implement:

- Reservation CRUD
- Space CRUD
- Role Management
- Advanced Guards
- Permission Validations
- Administrative Dashboard
- Statistics
- Filters and Searches
- Notifications
- Business Rules

---