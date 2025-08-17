# Rock-Paper-Scissors-Lizard-Spock (RPSLS) App

Note: in a production environment, connection strings, passwords, and other secrets must be saved in environment variables or a secret manager (or in .env file for local testing).
For this app, they are directly included in docker and service files for simplicity.

This project contains a **frontend UI** and **backend services** for the RPSLS game. Backend services are Dockerized and include:

- `game-service` – Handles game logic
- `random-service` – Provides random values for the game
- `scoreboard-service` – Stores game results in a SQL database
- `mssql` – SQL database for scoreboard

---

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- Git

---

## Backend Setup

1. **Navigate to the project root:**

```bash
cd <project-root> 
```

2. **Start all backend services via Docker Compose:**
```bash
docker rm -f rpsls-sql              
docker volume rm scoreboard_data
docker volume create scoreboard_dataupdate
docker-compose up --build 
```

This will:
- Build and start game-service, random-service, scoreboard-service, and mssql.
- Expose ports:
    - 5001 → game-service
    - 5002 → scoreboard-service
    - 5003 → random-service
    - 1433 → SQL database

3. **Database setup:**
- scoreboard-service automatically runs migrations from /app/migrations volume.
- SQL Server credentials:
    - User: sa
    - Password: YourStrong!Passw0rd
    - Database: ScoreboardDb


## Frontend UI Setup
``` bash
cd ui # navigate to the UI folder
npm install # install dependencies
npm run dev # run the frontend 
```

### Development Workflow
- UI: React + Redux Toolkit
- API calls: Axios via RTK Query
- Scoreboard: Persisted in SQL Server
- Run Docker Compose during local development to have all services available.
- Frontend fetches game choices, submits plays, and updates scoreboard automatically.
- Backend used C# (.NET framework), CQRS and mediator



