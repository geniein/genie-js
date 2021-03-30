import Queue from 'bull';
import models from '../mongoose';
import opts from '../lib/redisConnection';

const callApiQueue = new Queue('last-login', opts);

callApiQueue.process(async (job) => {
  try {
    const { apiUrl } = job.data;

    const result = await models.CallApi.findOneAndUpdate({ api: apiUrl }, {
      $inc: { count: 1 }
    });
    return Promise.resolve({ result });
  } catch (error) {
    Promise.reject(error);
  }
});

const callApi = async (req, res, next) => {
  callApiQueue.add({ apiUrl: req.originalUrl });

  next();
};

export default callApi;