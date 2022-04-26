import express from 'express';
import cors from 'cors';
import patientRouter from './router/patientor';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api',patientRouter);

const PORT = 3001;

app.listen(PORT, ()=> {
    console.log(`Server running on PORT:${PORT}`);
});