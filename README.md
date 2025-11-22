# 📘 Team Task Dashboard  
A full-stack **Task & Team Management App** built using:

- **Frontend:** React + TypeScript + Vite + Context API + React Router + TailwindCSS  
- **Backend:** Node.js + Express + TypeScript + MongoDB + Mongoose  
- **Auth:** JWT-based authentication  
- **RBAC:** Admin / Member   
- **Logging:** Winston  
- **Validation:** express-validator  
- **Containerization:** Docker & Docker-Compose  

Admins can manage users, login users, and assign tasks.  
Members can view & update only their own tasks.

---

# 🚀 Features

### 👥 User Management
- Admin can create:
  - **Team Member**
  - **Login User (AuthUser)**
- Auto-sync login users into the team users table  
- User list with delete

### 📝 Task Management
- Admin: create, edit, assign, delete tasks  
- Members: view own tasks, update task status  
- Table view with status dropdown  
- Inline task creation/editing form  

### 🔐 Authentication
- JWT-based login  
- Role-based access (Admin / Member)  

### 🗄️ Backend Features
- Express + Mongoose  
- Global error handler  
- Input validation  
- Winston logging    

### 🎨 Frontend
- React + TS + Vite  
- TailwindCSS UI  
- Context-based Auth  
- React Router (nested routes + layout)  
- Toast notifications  

### 🐳 Docker Support
- Build production frontend using NGINX  
- Backend server in Node  
- MongoDB container  
- One command to start all services  

---

# 📂 Project Structure

```
root/
 ├─ backend/
 │   ├─ src/
 │   │   ├─ controllers/
 │   │   ├─ middleware/
 │   │   ├─ models/
 │   │   ├─ routes/
 │   │   ├─ utils/
 │   │   └─ server.ts
 │   ├─ tests/ (Jest)
 │   ├─ Dockerfile
 │   └─ package.json
 │
 ├─ frontend/
 │   ├─ src/
 │   │   ├─ components/
 │   │   ├─ pages/
 │   │   ├─ context/
 │   │   └─ api/
 │   ├─ Dockerfile
 │   └─ package.json
 │
 ├─ docker-compose.yml
 └─ README.md
```

---

# 🛠️ Local Setup (Without Docker)

## 1️⃣ Clone the Repository

```
git clone https://github.com/prasenjit-das-87/team-task.git
cd team-task
```

---

# ⚙️ Backend Setup

### 1. Install dependencies

```
cd backend
npm install
```

### 2. Update/Create `.env`

```
PORT=4000
MONGO_URI=mongodb+srv://<user_name>:<password?@team-task-db.390fum0.mongodb.net/?appName=<db_name>
JWT_SECRET=your_secret_key
```

### 3. Run backend

```
npm run dev
```

Backend runs at:  
📌 **http://localhost:4000**

---

# 🎨 Frontend Setup

### 1. Install dependencies

```
cd frontend
npm install
```

### 2. Create `.env`

```
VITE_API_BASE=http://localhost:4000/api
```

### 3. Run frontend

```
npm run dev
```

Frontend runs at:  
📌 **http://localhost:3000**

---

# 🐳 Docker Setup (Recommended)

From project root:

```
docker-compose build --no-cache
docker-compose up
```

This will start:

| Service | URL |
|--------|------|
| frontend | http://localhost:3000 |
| backend | http://localhost:4000 |

### To stop:

```
docker-compose down
```

---

# 🔐 Login Credentials (if seeded)
Example:

```
Admin:
email: prasenjit@team-task.com
password: 123456
```

---

# 🧪 API Endpoints

## Auth
| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | Admin | Create login user |
| POST | /api/auth/login | All | Login |

## Users
| Method | Endpoint | Role |
|--------|----------|------|
| GET | /api/users | Admin |
| POST | /api/users | Admin |
| DELETE | /api/users/:id | Admin |

## Tasks
| Method | Endpoint | Role |
|--------|----------|------|
| GET | /api/tasks | Admin/Member |
| POST | /api/tasks | Admin |
| PATCH | /api/tasks/:id | Admin |
| PATCH | /api/tasks/:id/assign | Admin |
| PATCH | /api/tasks/:id/status | Admin/Member |
| DELETE | /api/tasks/:id | Admin |

---

# 🔐 Role Based Access Summary

| Feature | Admin | Member |
|---------|--------|---------|
| View all tasks | ✅ | ❌ |
| View only own tasks | ❌ | ✅ |
| Update task status | ❌ | ✔️ (only own tasks) |
| Create tasks | ✔️ | ❌ |
| Edit tasks | ✔️ | ❌ |
| Delete tasks | ✔️ | ❌ |
| Assign tasks | ✔️ | ❌ |
| View all users | ✔️ | ❌ |
| Create team user | ✔️ | ❌ |
| Create login user | ✔️ | ❌ |

---
