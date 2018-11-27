import express from 'express';
import { json as jsonParser } from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';
import { notFound, handler } from './middleware/error';
import path from 'path';
import config from './middleware/config';

const { database, port } = config;

const app = express();

let db;

if (database.link) {
	mongoose.connect(database.link);
	db = mongoose.connection;
} else {
	console.log('No database has been configured for the application');
	process.exit(1);
}

app.use(express.static(path.join(__dirname, '../public')));

db.on("error", err => {
  console.error("connection error:", err);
});

db.once("open", () => {
  console.log("db connection successful");
});

app.use(logger("dev"));
app.use(jsonParser());
app.use(cors());

// include routes
app.use('/api/v1/', routes);

// catch 404 and forward to error handler
app.use(notFound);

// Error handler
app.use(handler);


// serve the client
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const server = app.listen(port, () => {
  console.log('Express server is listening on port:', port);
});

export default server;