import mongoose from 'mongoose';

/**
 * CallApi Schema
 * @private
 */
const callApiSchema = new mongoose.Schema({
  api: {
    type: String,
  },
  count: { type: Number, default: 0 },
}, { timestamps: true });

const CallApi = mongoose.model('CallApi', callApiSchema);

export default CallApi;