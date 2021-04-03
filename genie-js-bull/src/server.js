import express from 'express';
import { connectToMongo } from './mongoose';
import callApi from './jobs/callApiJob';

const app = express();

connectToMongo();

app.get('/', (req, res) => {
  res.send('hello world');
});
 
app.use(callApi);

app.get('/api-1', (req, res) => {
  res.send('call-api-1');
});
app.get('/api-2', (req, res) => {
  res.send('call-api-2');
});

app.listen(3000, () => console.log('server listening on port 3000!'));