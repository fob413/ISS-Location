import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

const jsonParser = bodyParser.json;
const app = express();

app.use(logger("dev"));
app.use(jsonParser());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	if(req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
		return res.status(200).json({});
	}
	next();
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  let error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});


var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Express server is listening on port:', port);
});