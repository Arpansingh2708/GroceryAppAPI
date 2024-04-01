import express from 'express';
import connectDB from './config/db';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
connectDB();

app.use(express.json());

app.get('/', (req, res) => res.send('API Running'));
// Define routes here
// We can use Middleware to not let normal user to user Admin API's for that purpose login funtinality need to be implemented( Example-Firebase or Passport)
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

export default app;
