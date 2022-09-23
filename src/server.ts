import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/api';


// Base Configuration
dotenv.config();
const server = express();

// CORS
server.use(cors());
server.use(express.json()); //req.body

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));

// Routes
server.use(apiRoutes);

// Validating endpoints
server.use((req: Request, res: Response) => {
    res.status(404); // Not Found
    res.json({ error: 'Endpoint not found.' });
});

// Error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); // Bad Request
    console.log(err);
    res.json({ error: 'Error: ', err });
}
server.use(errorHandler);

// Running server
server.listen(process.env.PORT);