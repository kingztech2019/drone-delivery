import express from 'express';
import droneRoutes from './routes/droneRoutes';
import './tasks/batteryTask'; // Import the task to start the cron job
import { loadDummyData } from './seeds/dummyData';
import { AppDataSource } from './database';

const app = express();
app.use(express.json());

// Use routes
app.use('/api', droneRoutes);

// Database connection and server startup
AppDataSource.initialize()
  .then(async () => {
    console.log('Database connected successfully!');
    await loadDummyData(); // Load dummy data after database connection
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
