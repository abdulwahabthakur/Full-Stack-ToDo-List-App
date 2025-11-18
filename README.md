# Full-Stack-ToDo-List-App
# React Todo App

A simple full-stack Todo application (React frontend + Node/Express backend) that persists todos to a local JSON file. This repository contains a React frontend in the project root and a lightweight backend in the `server/` folder that stores todos in `todos.json` so items persist across refreshes.

**Features**
- Add, update (double-click to edit), and delete todos
- Optimistic UI updates for snappy UX
- Backend API with persistent storage to `todos.json`

**Project Structure**
- `server/` — backend (Express) and `todos.json` (persistent storage)
	- `server.js` — main server file
	- `package.json` — server dependencies & scripts
	- `todos.json` — created/updated automatically by the server
- `src/` — React app (components under `src/components/Todos`)
- `package.json` — frontend dependencies & scripts

**Prerequisites**
- Node.js (v16+ recommended)
- npm (bundled with Node)

**Backend (server)**
1. Open a terminal and change to the server folder:

```powershell
cd "c:\Users\Asus\Full Stack Todo list app\server"
```

2. Install server dependencies:

```powershell
npm install
```

3. Start the backend:

```powershell
npm start
```

The server listens on `http://localhost:8888` by default and persists data to `todos.json`.

If port `8888` is already in use, either stop the process using that port or change the `PORT` variable in `server/server.js`.

**API Endpoints**
- `GET /todos` — Get all todos
	- Example: `curl http://localhost:8888/todos`
- `POST /todos` — Create a todo (JSON body: `{ "message": "Buy milk", "id": 12345 }`)
	- Example: `curl -X POST -H "Content-Type: application/json" -d "{\"message\":\"Buy milk\"}" http://localhost:8888/todos`
- `PUT /todos/:id` — Update a todo
	- Example: `curl -X PUT -H "Content-Type: application/json" -d "{\"message\":\"Updated text\"}" http://localhost:8888/todos/12345`
- `DELETE /todos/:id` — Delete a todo
	- Example: `curl -X DELETE http://localhost:8888/todos/12345`

> The server stores and reads from `server/todos.json` so todos survive page refresh and server restarts.

**Frontend (React)**
1. From the project root (frontend folder):

```powershell
cd "c:\Users\Asus\Full Stack Todo list app\react-todo-app"
npm install
npm start
```

2. The React app runs at `http://localhost:3000` by default and expects the backend at `http://localhost:8888` (this is already configured in the code via `axios` requests).

**Usage Notes & Troubleshooting**
- If the app shows a blank page or console errors about `map` on `undefined`, ensure the frontend state initializes arrays (the app already initializes `todoList` as `[]`).
- If the backend responds with `EADDRINUSE` (address in use) when starting, either stop the process using that port or modify the `PORT` constant in `server/server.js`.
- If the frontend cannot reach the backend, make sure the backend is running and there is no firewall blocking `localhost` ports.

**Development Tips**
- Server logs are printed to the console by `server.js`. You can run the server with `nodemon` during development by installing `nodemon` globally or using the `dev` script in `server/package.json` (`npm run dev`).
- The backend uses a simple JSON file for persistence. For production or multi-user scenarios, consider replacing it with a proper database (SQLite, PostgreSQL, MongoDB, etc.).

**Contributing**
1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit changes and push
4. Open a pull request describing your changes

**License**
This project is open-source — add a license file as needed (e.g., `MIT`).

---

If you want, I can:
- Add a short `README` for `server/` specifically with commands
- Add an example `todos.json` sample file
- Add instructions to run both frontend and backend concurrently (using `concurrently` or `npm-run-all`)

Which of those would you like next?

