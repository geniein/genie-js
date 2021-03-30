import models, { connectToMongo, getMongoConnection } from '../mongoose';

connectToMongo();
const db = getMongoConnection();

db.on('error', error => {
  console.error('connection error', error);
});

db.once('open', () => {
  models.CallApi.deleteMany()
    .then(() => Promise.all([
      models.CallApi.create({ api: '/api-1', count: 0 }),
      models.CallApi.create({ api: '/api-2', count: 0 })
    ]))
    .then(() => {
      console.log('fixtures inserted to DB ✅');
      db.close();
    })
    .catch(error => {
      console.log('error: ', error);
      db.close();
    });
});

db.once('close', () => {
  console.log('connection closed, exiting');
  process.exit();
});