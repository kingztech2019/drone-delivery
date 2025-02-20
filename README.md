# Drone Delivery System (Node.js & TypeScript)

This is a backend application for managing a drone delivery system. Built with **Node.js**, **TypeScript**, **TypeORM**, and **SQLite**, it provides APIs to register drones, load medications, monitor battery levels, and manage drone deliveries efficiently.

---

## 🚀 Features

✅ Register drones with specific attributes (model, battery capacity, weight limit, and state).
✅ Load drones with medication items (with validation checks for weight and battery levels).
✅ Monitor battery levels of drones at regular intervals (using cron jobs).
✅ Manage available drones for delivery.
✅ Unit and integration tests using **Jest**.
✅ SQLite database with TypeORM migrations.
✅ Dummy data seeding for quick testing.

---

## 🛠️ Project Structure

```
DRONE-DELIVERY
│
├── src
│   ├── controllers
│   │   ├── droneController.ts
│   │   └── __tests__
│   │       └── droneController.test.ts
│   ├── entities
│   │   ├── drone.ts
│   │   └── medication.ts
│   ├── migrations
│   ├── routes
│   │   └── droneRoutes.ts
│   ├── seeds
│   │   └── dummyData.ts
│   ├── services
│   │   ├── droneService.ts
│   │   └── __tests__
│   │       └── droneService.test.ts
│   ├── tasks
│   ├── utils
│   ├── app.ts
│   ├── database.ts
│   └── index.ts
│
├── .gitignore
├── databases.sqlite
├── jest.config.js
├── jest.setup.js
├── nodemon.json
├── package.json
├── package-lock.json
└── README.md
```

---

## 🧪 Technologies Used

- **Node.js** & **TypeScript** — Core backend framework.
- **TypeORM** — ORM for managing SQLite database.
- **SQLite** — Lightweight database for quick development and testing.
- **Jest** — Testing framework for unit and integration tests.
- **Cron** — Battery level monitoring task.

---

## 📥 Installation

1️⃣ **Clone the repository:**

```bash
$ git clone https://github.com/kingztech2019/drone-delivery.git
$ cd drone-delivery
```

2️⃣ **Install dependencies:**

```bash
$ npm install
```

3️⃣ **Environment setup:**

Create a `.env` file in the root directory with the following variables:

```
DATABASE_PATH=./databases.sqlite
PORT=3000
```

4️⃣ **Run database migrations:**

```bash
$ npm run typeorm migration:run
```

5️⃣ **Seed dummy data:**

Dummy data for drones and medications will be seeded automatically when the app starts.

6️⃣ **Start the server:**

```bash
$ npm run dev
```

The server will start on `http://localhost:3000` 🚀

---

## 🧑‍💻 API Endpoints

| METHOD | ENDPOINT                     | DESCRIPTION                    |
|--------|------------------------------|--------------------------------|
| POST   | `/drones`                    | Register a new drone.          |
| POST   | `/drones/:id/load`           | Load medications onto a drone. |
| GET    | `/drones/:id/battery`        | Get the battery level of a drone. |
| GET    | `/drones/available`          | List available drones for delivery. |
| GET    | `/all-drones`                | List all drones. |

---

## 🧪 Running Tests

The project uses **Jest** for unit and integration testing.

1️⃣ **Run tests:**

```bash
$ npx jest
```

2️⃣ **Test structure:**

- `src/controllers/__tests__/droneController.test.ts` - Controller tests.
- `src/services/__tests__/droneService.test.ts` - Service layer tests.

---

## 🚀 Battery Monitoring (Cron Job)

- Battery levels of drones are monitored periodically using a cron job.
- Logs battery percentage and alerts when below a threshold.
- Defined in `src/tasks/batteryTask.ts`.

---

## 🤖 Dummy Data

- Dummy drones and medications are seeded automatically when the app starts.
- Defined in `src/seeds/dummyData.ts`.

 

